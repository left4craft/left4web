import Stripe from 'stripe';

// Instantiated lazily: on Workers process.env is populated per-request,
// so the key may not exist at module-import time.
let client = null;

function instance() {
	if (!client) {
		client = new Stripe(process.env.STRIPE_SECRET_KEY, {
			appInfo: {
				name: 'Left4Craft Store',
				version: '0.2'
			}
		});
	}
	return client;
}

export const stripe = new Proxy({}, { get: (_target, prop) => instance()[prop] });
