// Server-side config/secrets are provided at runtime by Wrangler (vars + secrets),
// NOT baked in at build time — do not add an `env` block here, it would inline
// build-machine values into the bundle and shadow the Worker's runtime env.
// NEXT_PUBLIC_* vars are still inlined into client code automatically at build.

/** @type {import('next').NextConfig} */
const nextConfig = {
	// no sharp on Workers; remote images (crafatar, mc-heads, stripe, avatars)
	// are served as-is. Switch to a Cloudflare Images loader if optimization is
	// ever wanted: https://opennext.js.org/cloudflare/howtos/image
	images: { unoptimized: true },
	// file tracing drops the workerd-conditional files of these packages
	// (pg-cloudflare esm/, @better-auth/core pure.index.mjs, stripe
	// esm/stripe.esm.worker.js), which the OpenNext esbuild step (which
	// resolves with the "workerd" condition) then fails to resolve or
	// bundle — include them wholesale
	outputFileTracingIncludes: {
		'**': [
			'node_modules/@better-auth/core/**',
			'node_modules/better-auth/**',
			'node_modules/pg/**',
			'node_modules/pg-cloudflare/**',
			'node_modules/stripe/**'
		]
	}
};

module.exports = nextConfig;

// lets `next dev` access Cloudflare bindings (Hyperdrive) via wrangler's local proxy
if (process.env.NODE_ENV === 'development') {
	const { initOpenNextCloudflareForDev } = require('@opennextjs/cloudflare');
	initOpenNextCloudflareForDev();
}
