/* eslint-disable max-depth */
// const stripe = require('stripe');
import { buffer } from 'micro';
import {
	ddb, sqs
} from '../../../utils/aws';
import { stripe } from '../../../utils/stripe';

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// AWS.Config.update({
// 	accessKeyId: process.env.DYNAMODB_ACCESS_KEY_ID,
// 	region: process.env.DYNAMODB_REGION,
// 	secretAccessKey: process.env.DYNAMODB_ACCESS_KEY_SECRET
// });

/*
{
	username: Captain_Sisko,
	uuid: 804c7ee5-db51-4e58-a011-475f00df6828,
	commands: []
}
*/

export const config = { api: { bodyParser: false } };

export default async (req, res) => {

	if (req.method === 'POST') {
		const buf = await buffer(req);
		const sig = req.headers['stripe-signature'];

		let event;

		const warnings = [];
		const commands = [];
		let username = null;
		let uuid = null;
		let time = null;

		try {
			event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
			// use "livemode" value instead
			// event.environment = process.env.NODE_ENV;

			// add uuid to free trials table to enforce one free trial per mc account
			if(event.type === 'customer.subscription.created') {
				if(event.data.object.status === 'trialing' && event.data.object.metadata !== undefined) {
					await ddb
						.putItem({
							Item: { mcuuid: { S: event.data.object.metadata.mc_uuid } },
							TableName: process.env.DYNAMODB_STRIPE_TRIALS_TABLE
						})
						.promise();
				}
			}

			const saved_event = (
				await ddb
					.query({
						ExpressionAttributeValues: { ':id': { S: event.id } },
						KeyConditionExpression: 'id = :id',
						TableName: process.env.DYNAMODB_STRIPE_EVENTS_TABLE
					})
					.promise()
			).Items[0];
			if(!saved_event) {
				await ddb
					.putItem({
						Item: {
							data: { S: JSON.stringify(event) },
							id: { S: event.id },
							timestamp: { N: event.created.toString() }
						},
						TableName: process.env.DYNAMODB_STRIPE_EVENTS_TABLE
					})
					.promise();


				// invoice paid event, used to handle subscriptions
				if(event.type === 'invoice.paid') {
					const lineItems = event.data.object.lines.data;
					for(const lineItem of lineItems) {
						if(lineItem.type !== 'subscription') {
							warnings.push('Non-subscription product found on invoice');
							continue;
						}
						username = lineItem.metadata.mc_username;
						uuid = lineItem.metadata.mc_uuid;

						const remainingDays = Math.floor((1660625482 - Date.now()/1000)/86400)+5;
						time = `${remainingDays}d`;

						const type = lineItem.price.recurring.interval === 'month' ? 'monthly' : 'yearly';

						const product = await stripe.products.retrieve(
							lineItem.price.product
						);

						for(const [key,
							value] of Object.entries(product.metadata)) {
							// repeat commands for higher quantities of subscriptions
							for(let i = 0; i < lineItem.quantity; i += 1) {
								if(key.startsWith(`mc_${type}`)) {
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
				if(event.type === 'checkout.session.completed') {
					if(event.data.object.mode !== 'payment') {
						warnings.push('checkout.session.completed called in non-payment mode');
					} else {
						username = event.data.object.metadata.mc_username;
						uuid = event.data.object.metadata.mc_uuid;

						const lineItems = await stripe.checkout.sessions.listLineItems(
							event.data.object.id,
							{ limit: 99 }
						);
						for(const lineItem of lineItems.data) {
							console.log(lineItem);
						}
					}
				}

				event.commands = commands;
				await sqs.sendMessage({
					MessageBody: JSON.stringify(event),
					MessageDeduplicationId: event.id,
					MessageGroupId: 'webhook_event',
					QueueUrl: process.env.SQS_QUEUE_URL
				}).promise();

				// SQS_QUEUE_URL
			} else {
				res.status(400).send('Webhook Error: repeated event');
				return;
			}
		} catch (err) {
			// console.log(err.message);
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
