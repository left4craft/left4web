// Used only by `npm run auth:schema` (@better-auth/cli) to generate
// migrations/001_better_auth.sql — not imported by the app.
import { betterAuth } from 'better-auth';
import { magicLink } from 'better-auth/plugins';
import pg from 'pg';

export const auth = betterAuth({
	database: new pg.Pool({ connectionString: process.env.DATABASE_URL || 'postgres://localhost/left4craft' }),
	plugins: [magicLink({ sendMagicLink: async () => {} })],
	socialProviders: {
		discord: {
			clientId: 'cli',
			clientSecret: 'cli'
		}
	}
});
