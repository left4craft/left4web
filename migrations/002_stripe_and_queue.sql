-- Replaces the three DynamoDB tables and the SQS queue.

-- was DYNAMODB_STRIPE_TABLE: email -> stripe customer id
CREATE TABLE stripe_customers (
	email text NOT NULL PRIMARY KEY,
	stripe_customer_id text NOT NULL
);

-- was DYNAMODB_STRIPE_TRIALS_TABLE: one free trial per Minecraft account
CREATE TABLE stripe_trials (
	mc_uuid text NOT NULL PRIMARY KEY,
	created_at timestamptz NOT NULL DEFAULT now()
);

-- was DYNAMODB_STRIPE_EVENTS_TABLE: webhook idempotency + event archive
CREATE TABLE stripe_events (
	id text NOT NULL PRIMARY KEY,
	event_timestamp bigint NOT NULL,
	data jsonb NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now()
);

-- was SQS: rank-command jobs consumed by the Left4Hub plugin, which polls with
--   DELETE FROM job_queue
--   WHERE id IN (SELECT id FROM job_queue ORDER BY id FOR UPDATE SKIP LOCKED LIMIT 10)
--   RETURNING payload;
CREATE TABLE job_queue (
	id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	dedupe_id text NOT NULL UNIQUE,
	payload jsonb NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now()
);
