-- better-auth 1.7 core schema (user, session, account, verification).
-- Field set verified against getAuthTables() from the installed package;
-- the magicLink plugin uses the verification table and adds no tables.

CREATE TABLE "user" (
	"id" text NOT NULL PRIMARY KEY,
	"name" text NOT NULL,
	"email" text NOT NULL UNIQUE,
	"emailVerified" boolean NOT NULL DEFAULT false,
	"image" text,
	"createdAt" timestamptz NOT NULL DEFAULT now(),
	"updatedAt" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE "session" (
	"id" text NOT NULL PRIMARY KEY,
	"expiresAt" timestamptz NOT NULL,
	"token" text NOT NULL UNIQUE,
	"createdAt" timestamptz NOT NULL DEFAULT now(),
	"updatedAt" timestamptz NOT NULL,
	"ipAddress" text,
	"userAgent" text,
	"userId" text NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE
);
CREATE INDEX "session_userId_idx" ON "session" ("userId");

CREATE TABLE "account" (
	"id" text NOT NULL PRIMARY KEY,
	"issuer" text NOT NULL,
	"accountId" text NOT NULL,
	"providerId" text NOT NULL,
	"userId" text NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
	"accessToken" text,
	"refreshToken" text,
	"idToken" text,
	"accessTokenExpiresAt" timestamptz,
	"refreshTokenExpiresAt" timestamptz,
	"scope" text,
	"password" text,
	"createdAt" timestamptz NOT NULL DEFAULT now(),
	"updatedAt" timestamptz NOT NULL
);
CREATE INDEX "account_userId_idx" ON "account" ("userId");

CREATE TABLE "verification" (
	"id" text NOT NULL PRIMARY KEY,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expiresAt" timestamptz NOT NULL,
	"createdAt" timestamptz NOT NULL DEFAULT now(),
	"updatedAt" timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX "verification_identifier_idx" ON "verification" ("identifier");
