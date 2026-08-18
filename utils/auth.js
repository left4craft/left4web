import { betterAuth } from 'better-auth';
import { magicLink } from 'better-auth/plugins';
import { db } from './db';
import { sendEmail } from './ses';

// Built per call — construction is cheap, and holding an instance across
// requests would hold its pg pool's sockets across requests too, which
// Workers forbid. db() itself is request-scoped (see utils/db.js).
export function getAuth() {
	return betterAuth({
		// Resolved from each request's host so next dev (3000), wrangler preview
		// (8787), workers.dev deploys, and production all build correct origins
		// and OAuth redirects; the allowlist keeps a spoofed Host header out of
		// magic-link emails.
		baseURL: {
			allowedHosts: ['localhost:*', '127.0.0.1:*', 'left4craft.org', '*.left4craft.org', '*.workers.dev'],
			fallback: process.env.NEXT_PUBLIC_URL
		},
		database: db(),
		plugins: [
			magicLink({
				sendMagicLink: async ({ email, url }) => {
					await sendEmail({
						html: `<p>Click the link below to sign in to Left4Craft:</p>
								<p><a href="${url}">Sign in</a></p>
								<p>If you did not request this email, you can safely ignore it.</p>`,
						subject: 'Sign in to Left4Craft',
						text: `Sign in to Left4Craft: ${url}\n\nIf you did not request this email, you can safely ignore it.`,
						to: email
					});
				}
			})
		],
		secret: process.env.BETTER_AUTH_SECRET,
		// validate sessions from a signed cookie for 5 minutes between database hits
		session: {
			cookieCache: {
				enabled: true,
				maxAge: 5 * 60
			}
		},
		socialProviders: {
			discord: {
				clientId: process.env.DISCORD_CLIENT_ID,
				clientSecret: process.env.DISCORD_CLIENT_SECRET
			}
		}
	});
}

// Session for pages-router API routes and getServerSideProps.
// Returns { user, session } or null — callers use session.user.email like before.
export async function getServerSession(req) {
	const headers = new Headers();
	for (const [key, value] of Object.entries(req.headers)) {
		if (typeof value === 'string') headers.set(key, value);
		else if (Array.isArray(value)) for (const v of value) headers.append(key, v);
	}
	return await getAuth().api.getSession({ headers });
}
