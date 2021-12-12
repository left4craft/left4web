const stripe = require('stripe');
import { buffer } from 'micro';
import {
	ddb, sqs
} from '../../../utils/aws';

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// AWS.Config.update({
// 	accessKeyId: process.env.DYNAMODB_ACCESS_KEY_ID,
// 	region: process.env.DYNAMODB_REGION,
// 	secretAccessKey: process.env.DYNAMODB_ACCESS_KEY_SECRET
// });

export const config = { api: { bodyParser: false } };

export default async (req, res) => {

	if (req.method === 'POST') {
		const buf = await buffer(req);
		const sig = req.headers['stripe-signature'];

		let event;

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
							TableName: process.env.DYNAMODB_STRIPE_TABLE
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

		res.json({ received: true });
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
};
