// One-time DynamoDB -> Postgres migration (idempotent: safe to re-run for a
// delta pass after cutover; every insert is ON CONFLICT DO NOTHING).
//
// Usage:
//   DATABASE_URL=postgres://... \
//   MIGRATION_AWS_ACCESS_KEY_ID=... MIGRATION_AWS_SECRET_ACCESS_KEY=... \
//   MIGRATION_AWS_REGION=us-east-1 \
//   DYNAMODB_NEXTAUTH_TABLE=... DYNAMODB_STRIPE_TABLE=... \
//   DYNAMODB_STRIPE_TRIALS_TABLE=... DYNAMODB_STRIPE_EVENTS_TABLE=... \
//   node scripts/migrate_dynamo_to_postgres.mjs
//
// Sessions and verification tokens are intentionally not migrated: better-auth
// cannot use next-auth sessions, so everyone signs in again once post-cutover.

import { randomUUID } from 'node:crypto';
import { AwsClient } from 'aws4fetch';
import pg from 'pg';

const region = process.env.MIGRATION_AWS_REGION || 'us-east-1';
const aws = new AwsClient({
	accessKeyId: process.env.MIGRATION_AWS_ACCESS_KEY_ID,
	region: region,
	secretAccessKey: process.env.MIGRATION_AWS_SECRET_ACCESS_KEY,
	service: 'dynamodb'
});

const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// minimal DynamoDB AttributeValue -> JS
function unmarshall(av) {
	if (av.S !== undefined) return av.S;
	if (av.N !== undefined) return Number(av.N);
	if (av.BOOL !== undefined) return av.BOOL;
	if (av.NULL) return null;
	if (av.L) return av.L.map(unmarshall);
	if (av.M) return Object.fromEntries(Object.entries(av.M).map(([k, v]) => [k, unmarshall(v)]));
	return undefined;
}

async function* scan(table) {
	let startKey;
	do {
		const res = await aws.fetch(`https://dynamodb.${region}.amazonaws.com/`, {
			body: JSON.stringify({
				ExclusiveStartKey: startKey,
				TableName: table
			}),
			headers: {
				'Content-Type': 'application/x-amz-json-1.0',
				'X-Amz-Target': 'DynamoDB_20120810.Scan'
			},
			method: 'POST'
		});
		if (!res.ok) throw new Error(`Scan of ${table} failed (${res.status}): ${await res.text()}`);
		const data = await res.json();
		for (const item of data.Items || []) {
			yield Object.fromEntries(Object.entries(item).map(([k, v]) => [k, unmarshall(v)]));
		}
		startKey = data.LastEvaluatedKey;
	} while (startKey);
}

function stripPrefix(value, prefix) {
	return value?.startsWith(prefix) ? value.slice(prefix.length) : value;
}

async function migrateAuth() {
	let users = 0;
	let accounts = 0;
	let skipped = 0;

	// pass 1: users (accounts reference them)
	const items = [];
	for await (const item of scan(process.env.DYNAMODB_NEXTAUTH_TABLE)) items.push(item);

	for (const item of items) {
		if (item.type !== 'USER') continue;
		const id = stripPrefix(item.pk ?? item.id, 'USER#');
		if (!id || !item.email) {
			skipped += 1;
			continue;
		}
		await db.query(
			`INSERT INTO "user" ("id", "name", "email", "emailVerified", "image", "createdAt", "updatedAt")
			 VALUES ($1, $2, $3, $4, $5, COALESCE($6::timestamptz, now()), now())
			 ON CONFLICT ("id") DO NOTHING`,
			[id, item.name ?? item.email, item.email, Boolean(item.emailVerified), item.image ?? null, item.createdAt ?? null]
		);
		users += 1;
	}

	// pass 2: linked oauth accounts (only Discord exists on this site)
	for (const item of items) {
		if (item.type !== 'ACCOUNT') continue;
		const userId = stripPrefix(item.pk ?? item.userId, 'USER#');
		const providerId = item.provider ?? item.providerId;
		const accountId = item.providerAccountId;
		if (!userId || !providerId || !accountId) {
			skipped += 1;
			continue;
		}
		await db.query(
			`INSERT INTO "account" ("id", "issuer", "accountId", "providerId", "userId", "createdAt", "updatedAt")
			 SELECT $1, $2, $3, $4, $5, now(), now()
			 WHERE EXISTS (SELECT 1 FROM "user" WHERE "id" = $5)
			 ON CONFLICT ("id") DO NOTHING`,
			[
				randomUUID(),
				// synthetic issuer better-auth uses for OAuth providers without their own
				`local:oauth:${providerId}`,
				accountId,
				providerId,
				userId
			]
		);
		accounts += 1;
	}

	console.log(`auth: ${users} users, ${accounts} accounts (${skipped} skipped)`);
}

async function migrateStripe() {
	let customers = 0;
	for await (const item of scan(process.env.DYNAMODB_STRIPE_TABLE)) {
		if (!item.email || !item.stripe_customer_id) continue;
		await db.query(
			`INSERT INTO stripe_customers (email, stripe_customer_id)
			 VALUES ($1, $2) ON CONFLICT (email) DO NOTHING`,
			[item.email, item.stripe_customer_id]
		);
		customers += 1;
	}
	console.log(`stripe_customers: ${customers}`);

	let trials = 0;
	for await (const item of scan(process.env.DYNAMODB_STRIPE_TRIALS_TABLE)) {
		if (!item.mcuuid) continue;
		await db.query('INSERT INTO stripe_trials (mc_uuid) VALUES ($1) ON CONFLICT (mc_uuid) DO NOTHING', [item.mcuuid]);
		trials += 1;
	}
	console.log(`stripe_trials: ${trials}`);

	let events = 0;
	for await (const item of scan(process.env.DYNAMODB_STRIPE_EVENTS_TABLE)) {
		if (!item.id) continue;
		await db.query(
			`INSERT INTO stripe_events (id, event_timestamp, data)
			 VALUES ($1, $2, $3) ON CONFLICT (id) DO NOTHING`,
			[item.id, item.timestamp ?? 0, item.data ?? '{}']
		);
		events += 1;
	}
	console.log(`stripe_events: ${events}`);
}

await migrateAuth();
await migrateStripe();
await db.end();
console.log('done');
