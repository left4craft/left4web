/* eslint-disable max-depth */
import { enqueueJob, query } from '../../../utils/db';
import { stripe } from '../../../utils/stripe';

export const config = { api: { bodyParser: false } };

// signature verification needs the raw request body (previously micro's buffer())
function rawBody(req) {
	return new Promise((resolve, reject) => {
		const chunks = [];
		req.on('data', (chunk) => chunks.push(chunk));
		req.on('end', () => resolve(Buffer.concat(chunks)));
		req.on('error', reject);
	});
}

export default async (req, res) => {
	if (req.method === 'POST') {
		const buf = await rawBody(req);
		const sig = req.headers['stripe-signature'];

		let event;

		const warnings = [];
		const commands = [];
		let username = null;
		let uuid = null;
		let time = null;

		try {
			event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);

			// add uuid to free trials table to enforce one free trial per mc account
			if (event.type === 'customer.subscription.created') {
				if (event.data.object.status === 'trialing' && event.data.object.metadata !== undefined) {
					await query('INSERT INTO stripe_trials (mc_uuid) VALUES ($1) ON CONFLICT (mc_uuid) DO NOTHING', [event.data.object.metadata.mc_uuid]);
				}
			}

			// idempotency: the insert only wins for the first delivery of an event
			const inserted = await query(
				`INSERT INTO stripe_events (id, event_timestamp, data)
				 VALUES ($1, $2, $3)
				 ON CONFLICT (id) DO NOTHING`,
				[event.id, event.created, JSON.stringify(event)]
			);
			if (inserted.rowCount > 0) {
				// invoice paid event, used to handle subscriptions
				if (event.type === 'invoice.paid') {
					const lineItems = event.data.object.lines.data;
					for (const lineItem of lineItems) {
						if (lineItem.type !== 'subscription') {
							warnings.push('Non-subscription product found on invoice');
							continue;
						}
						username = lineItem.metadata.mc_username;
						uuid = lineItem.metadata.mc_uuid;

						const remainingDays = Math.floor((lineItem.period.end - Date.now() / 1000) / 86400) + 5;
						time = `${remainingDays}d`;

						const type = lineItem.price.recurring.interval === 'month' ? 'monthly' : 'yearly';

						const product = await stripe.products.retrieve(lineItem.price.product);

						for (const [key, value] of Object.entries(product.metadata)) {
							// repeat commands for higher quantities of subscriptions
							for (let i = 0; i < lineItem.quantity; i += 1) {
								if (key.startsWith(`mc_${type}_cmd`)) {
									let command = value;
									command = command.replace('{USERNAME}', username);
									command = command.replace('{UUID}', uuid);
									command = command.replace('{TIME}', time);
									commands.push(command);
								}
							}
						}
					}
				}
				// checkout session completed event, used to handle one-time payments
				if (event.type === 'checkout.session.completed') {
					if (event.data.object.mode !== 'payment') {
						warnings.push('checkout.session.completed called in non-payment mode');
					} else {
						username = event.data.object.metadata.mc_username;
						uuid = event.data.object.metadata.mc_uuid;

						const lineItems = await stripe.checkout.sessions.listLineItems(event.data.object.id, { limit: 99 });
						for (const lineItem of lineItems.data) {
							const product = await stripe.products.retrieve(lineItem.price.product);
							for (const [key, value] of Object.entries(product.metadata)) {
								// repeat commands for higher quantities of subscriptions
								for (let i = 0; i < lineItem.quantity; i += 1) {
									if (key.startsWith('mc_lifetime_cmd')) {
										let command = value;
										command = command.replace('{USERNAME}', username);
										command = command.replace('{UUID}', uuid);
										commands.push(command);
									}
								}
							}
						}
					}
				}

				// hand the rank commands to Left4Hub via the Postgres job queue (was SQS)
				await enqueueJob(event.id, {
					commands: JSON.stringify(commands),
					livemode: event.livemode,
					username: username,
					uuid: uuid,
					warnings: JSON.stringify(warnings)
				});
			} else {
				res.status(400).send('Webhook Error: repeated event');
				return;
			}
		} catch (err) {
			res.status(400).send(`Webhook Error: ${err.message}`);
			return;
		}

		res.json({
			commands: JSON.stringify(commands),
			received: true,
			time: time,
			username: username,
			uuid: uuid,
			warnings: JSON.stringify(warnings)
		});
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
};
