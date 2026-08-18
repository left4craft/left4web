import { getCloudflareContext } from '@opennextjs/cloudflare';
import pg from 'pg';

// LiteBans stores times as bigint millis; without this pg returns them as strings
pg.types.setTypeParser(20, (val) => Number(val));

// One pool per request: Workers forbid using sockets opened by another
// request, so a module-scope pool hangs every request after the first.
// Hyperdrive does the real cross-request pooling; the request-scoped pool
// just lets the handful of queries in one request share a connection (and
// better-auth's Kysely adapter requires a pool-shaped database anyway).
// Its sockets are torn down with the request context.
const pools = new WeakMap();
// next build / next dev / CLI scripts run outside a request context in
// plain Node, where a process-wide pool is fine
let globalPool = null;

export function db() {
	let ctx = null;
	try {
		ctx = getCloudflareContext().ctx;
	} catch {
		/* not in a Workers request context */
	}
	if (!ctx) {
		globalPool ??= newPool();
		return globalPool;
	}
	let pool = pools.get(ctx);
	if (!pool) {
		pool = newPool();
		pools.set(ctx, pool);
	}
	return pool;
}

function newPool() {
	return new pg.Pool({
		connectionString: connectionString(),
		connectionTimeoutMillis: 10000,
		max: 5
	});
}

// Resolves the connection string from the Hyperdrive binding when running on
// Workers, falling back to DATABASE_URL for `next build` / CLI tooling.
export function connectionString() {
	try {
		const { env } = getCloudflareContext();
		if (env?.HYPERDRIVE?.connectionString) return env.HYPERDRIVE.connectionString;
	} catch {
		/* not in a Workers request context */
	}
	if (!process.env.DATABASE_URL) throw new Error('No HYPERDRIVE binding or DATABASE_URL set');
	return process.env.DATABASE_URL;
}

export const query = (text, params) => db().query(text, params);

// Enqueue a job for the Minecraft server (Left4Hub polls this table).
// Replaces SQS; dedupe_id preserves SQS's MessageDeduplicationId semantics.
export async function enqueueJob(dedupeId, payload) {
	await query(
		`INSERT INTO job_queue (dedupe_id, payload)
		 VALUES ($1, $2)
		 ON CONFLICT (dedupe_id) DO NOTHING`,
		[dedupeId, JSON.stringify(payload)]
	);
}
