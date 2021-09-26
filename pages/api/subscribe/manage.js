// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSession } from 'next-auth/client';
import { ddb } from '../../../utils/aws';
import { stripe } from '../../../utils/stripe';

export default async (req, res) => {
	const session = await getSession({ req });

	if (session) {
		try {
			// step 1: get the stripe customer
			const customer = await get_stripe_customer(session, stripe);

			// step 2: create the session
			const stripe_session = await stripe.billingPortal.sessions.create({
				customer: customer.id,
				return_url: process.env.NEXT_PUBLIC_URL + '/shop'
			});
			res.redirect(stripe_session.url);
		} catch (ex) {
			console.error(ex);

			return res.json({
				error: 'Internal server error',
				success: false
			});
		}
	} else {
		return res.json({
			error: 'Unauthorized',
			success: false
		});
	}
};

// helper function to get a stripe customer, either from the database or creating a new one
async function get_stripe_customer(session, stripe) {
	// query dynamodb to get the first matching email. The database shouldn
	const saved_stripe_customer = (
		await ddb
			.query({
				ExpressionAttributeValues: { ':email': { S: session.user.email } },
				KeyConditionExpression: 'email = :email',
				TableName: process.env.AWS_DYNAMODB_STRIPE_TABLE
			})
			.promise()
	).Items[0];

	// if the stripe user doesn't exist, make a new one
	let customer;
	if (!saved_stripe_customer) {
		customer = await stripe.customers.create({ email: session.user.email });
		await ddb
			.putItem({
				Item: {
					email: { S: session.user.email },
					stripe_customer_id: { S: customer.id }
				},
				TableName: process.env.AWS_DYNAMODB_STRIPE_TABLE
			})
			.promise();
	} else {
		console.log('Got stripe customer: ' + saved_stripe_customer.stripe_customer_id.S);
		customer = await stripe.customers.retrieve(saved_stripe_customer.stripe_customer_id.S);
	}

	return customer;
}
