// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSession } from 'next-auth/react';
import { ddb } from '../../../utils/aws';
import { stripe } from '../../../utils/stripe';
import { getCookie } from 'cookies-next';

export default async (req, res) => {
	const session = await getSession({ req });

	const {
		user, uuid
	} = req.query;

	const cart = getCookie('cart', {
		req,
		res
	});

	const line_items = [];
	try {
		for(const [id,
			product] of Object.entries(JSON.parse(cart))) {
			const item = {
				price: id,
				quantity: product.quantity
			};
			if(!product.limit_one) {
				item.adjustable_quantity = {
					enabled: true,
					maximum: product.unlimited_quantity ? 999 : 99
				};
			}
			line_items.push(item);
		}
	} catch(e) {
		console.error(e);
		return res.json({
			error: 'Invalid cart',
			success: false
		});
	}

	try {
		// step 1: get the stripe customer
		const customer = await get_stripe_customer(session, stripe);
		// step 2: create the session
		const checkout_session = await stripe.checkout.sessions.create({
			allow_promotion_codes: true,
			cancel_url: process.env.NEXT_PUBLIC_URL + '/shop/products/checkout',
			customer: customer.id,
			line_items: line_items,
			metadata: {
				mc_username: user,
				mc_uuid: uuid
			},
			mode: 'payment',
			payment_method_types: ['card'],
			success_url: process.env.NEXT_PUBLIC_URL + '/shop/success'
		});
		return res.json({
			session_id: checkout_session.id,
			success: true
		});
	} catch (ex) {
		console.error(ex);
		return res.json({
			error: 'Internal server error',
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
				TableName: process.env.DYNAMODB_STRIPE_TABLE
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
				TableName: process.env.DYNAMODB_STRIPE_TABLE
			})
			.promise();
	} else {
		// console.log('Got stripe customer: ' + saved_stripe_customer.stripe_customer_id.S);
		customer = await stripe.customers.retrieve(saved_stripe_customer.stripe_customer_id.S);
	}

	return customer;
}
