const stripe = require('stripe');
import { buffer } from 'micro';

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = { api: { bodyParser: false } };

export default async (req, res) => {
	if (req.method === 'POST') {
		console.log(webhookSecret);
		const buf = await buffer(req);
		const sig = req.headers['stripe-signature'];

		let event;

		try {
			event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
			console.log(event);
		} catch (err) {
			console.log(err.message);
			res.status(400).send(`Webhook Error: ${err.message}`);
			return;
		}

		res.json({ received: true });
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
};
