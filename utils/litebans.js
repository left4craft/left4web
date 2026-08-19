import { query } from './db';

// LiteBans queries, ported to Postgres from ../litebans-serverless (MySQL).
// Response shapes are kept identical to the old API, including the
// `pragnation` field name the table components expect.

const TABLES = {
	bans: 'litebans_bans',
	history: 'litebans_history',
	kicks: 'litebans_kicks',
	mutes: 'litebans_mutes',
	warnings: 'litebans_warnings'
};

const TYPES = ['bans', 'mutes', 'warnings', 'kicks'];

// latest known name for every uuid; the DISTINCT ON replaces MySQL's
// `WHERE date IN (SELECT max(date) ... GROUP BY uuid)` + GROUP BY dedup
const LATEST_NAMES = `SELECT DISTINCT ON (uuid) name, uuid FROM ${TABLES.history} ORDER BY uuid, date DESC`;

// silent::int works whether the migrated column ended up boolean or smallint
const NOT_SILENT = 'silent::int = 0';

function clampPaging(pageIn, perPageIn) {
	let page = Number(pageIn);
	let perPage = Number(perPageIn);
	if (isNaN(page) || isNaN(perPage)) return null;
	page = Math.max(0, Math.min(9999, page));
	perPage = Math.max(0, Math.min(100, perPage));
	return {
		page,
		perPage
	};
}

function dashify(uuid) {
	if (uuid.length !== 32) return uuid;
	return `${uuid.slice(0, 8)}-${uuid.slice(8, 12)}-${uuid.slice(12, 16)}-${uuid.slice(16, 20)}-${uuid.slice(20)}`;
}

// GET /check equivalent: resolve a username or uuid to the latest name/uuid pair
export async function check(nameIn) {
	let name = nameIn;
	let column = 'name';

	if (/^[0-9a-zA-Z-]{32,36}$/.test(name)) {
		column = 'uuid';
		name = dashify(name);
	} else if (!/^[0-9a-zA-Z_]{1,16}$/.test(name)) {
		return {
			message: 'Invalid name or UUID',
			success: false
		};
	}

	const result = await query(`SELECT name, uuid FROM ${TABLES.history} WHERE ${column} = $1 ORDER BY date DESC LIMIT 1`, [name]);

	if (result.rows[0]?.name && result.rows[0]?.uuid) {
		return {
			result: result.rows[0],
			success: true
		};
	}
	return {
		message: 'Username or UUID not found',
		success: false
	};
}

// GET /list equivalent: one page of recent punishments of a type
export async function list(type, pageIn, perPageIn) {
	if (!TYPES.includes(type)) {
		return {
			message: 'Invalid punishment type',
			success: false
		};
	}
	const paging = clampPaging(pageIn, perPageIn);
	if (!paging) {
		return {
			message: 'Invalid page numbers',
			success: false
		};
	}
	const { page, perPage } = paging;

	const removedCols = type !== 'kicks' ? ', t1.removed_by_name AS removed_by_name, t1.removed_by_uuid AS removed_by_uuid' : '';

	const result = await query(
		`SELECT t1.id AS id, t2.name AS name, t1.uuid AS uuid, t3.name AS banned_by,
			t1.banned_by_uuid AS banned_by_uuid, t1.reason AS reason, t1.time AS time, t1.until AS until
			${removedCols}
		FROM ${TABLES[type]} t1
		JOIN (${LATEST_NAMES}) AS t2 ON (t1.uuid = t2.uuid)
		JOIN (${LATEST_NAMES}) AS t3 ON (t1.banned_by_uuid = t3.uuid)
		WHERE t1.${NOT_SILENT}
		ORDER BY t1.time DESC
		LIMIT $1 OFFSET $2`,
		[perPage, page * perPage]
	);

	const pages = await query(`SELECT COUNT(id) AS count FROM ${TABLES[type]} WHERE ${NOT_SILENT}`);

	return {
		pragnation: {
			page: page,
			pages: Math.floor(Number(pages.rows[0].count) / perPage)
		},
		result: result.rows,
		success: true
	};
}

// GET /history equivalent: punishments for (received by) or by (issued by) a uuid
export async function history(type, uuid, pageIn, perPageIn) {
	if (!(/^[0-9a-zA-Z-]{36}$/.test(uuid) || uuid.toLowerCase() === 'console') || (type !== 'by' && type !== 'for')) {
		return {
			message: 'Invalid name, UUID, or other options',
			success: false
		};
	}
	const paging = clampPaging(pageIn, perPageIn);
	if (!paging) {
		return {
			message: 'Invalid page numbers',
			success: false
		};
	}
	const { page, perPage } = paging;

	const nameResult = await query(`SELECT name FROM ${TABLES.history} WHERE uuid = $1 ORDER BY date DESC LIMIT 1`, [uuid]);
	if (!nameResult.rows[0]) {
		return {
			message: 'Username or UUID not found',
			success: false
		};
	}
	const name = nameResult.rows[0].name;

	// which column identifies the subject: punishments *for* a player match uuid,
	// punishments *by* a staff member match banned_by_uuid
	const matchCol = type === 'for' ? 'uuid' : 'banned_by_uuid';

	let count = 0;
	for (const table of TYPES) {
		const c = await query(`SELECT COUNT(id) AS count FROM ${TABLES[table]} WHERE ${NOT_SILENT} AND ${matchCol} = $1`, [uuid]);
		count += Number(c.rows[0].count);
	}

	// per-type SELECT: the known side gets the literal name, the other side is
	// joined against the latest-names subquery (same as the old MySQL UNION)
	const part = (table) => {
		const removedCols =
			table !== 'kicks'
				? 't1.removed_by_name AS removed_by_name, t1.removed_by_uuid AS removed_by_uuid'
				: 'NULL AS removed_by_name, NULL AS removed_by_uuid';
		const joinCol = type === 'for' ? 't1.banned_by_uuid' : 't1.uuid';
		const nameCols = type === 'for' ? '$1 AS name, t1.uuid AS uuid, t2.name AS banned_by' : 't2.name AS name, t1.uuid AS uuid, $1 AS banned_by';
		return `(SELECT t1.id AS id, '${table}' AS type, ${nameCols},
			t1.banned_by_uuid AS banned_by_uuid, t1.reason AS reason, t1.time AS time, t1.until AS until,
			${removedCols}
		FROM ${TABLES[table]} t1
		JOIN (${LATEST_NAMES}) AS t2 ON (${joinCol} = t2.uuid)
		WHERE t1.${NOT_SILENT} AND t1.${matchCol} = $2)`;
	};

	const result = await query(`${TYPES.map(part).join(' UNION ')} ORDER BY time DESC LIMIT $3 OFFSET $4`, [name, uuid, perPage, page * perPage]);

	return {
		minecraft: {
			username: name,
			uuid: uuid
		},
		pragnation: {
			page: page,
			pages: Math.floor(count / perPage)
		},
		result: result.rows,
		success: true
	};
}

// GET /info equivalent: one punishment by id
export async function info(type, idIn) {
	if (!TYPES.includes(type)) {
		return {
			message: 'Invalid punishment type',
			success: false
		};
	}
	const id = Number(idIn);
	if (isNaN(id) || id < 0 || id > 999999) {
		return {
			message: 'Invalid ban id',
			success: false
		};
	}

	const removedCols =
		type !== 'kicks'
			? ', t1.removed_by_name AS removed_by_name, t1.removed_by_uuid AS removed_by_uuid, t1.removed_by_reason AS removed_by_reason'
			: '';

	const result = await query(
		`SELECT t1.id AS id, t2.name AS name, t1.uuid AS uuid, t3.name AS banned_by,
			t1.banned_by_uuid AS banned_by_uuid, t1.reason AS reason, t1.time AS time, t1.until AS until,
			t1.server_origin AS server_origin
			${removedCols}
		FROM ${TABLES[type]} t1
		JOIN (${LATEST_NAMES}) AS t2 ON (t1.uuid = t2.uuid)
		JOIN (${LATEST_NAMES}) AS t3 ON (t1.banned_by_uuid = t3.uuid)
		WHERE t1.id = $1 AND t1.${NOT_SILENT}
		LIMIT 1`,
		[id]
	);

	if (!result.rows[0]) {
		return {
			message: 'Punishment not found',
			success: false
		};
	}
	return {
		result: result.rows[0],
		success: true
	};
}
