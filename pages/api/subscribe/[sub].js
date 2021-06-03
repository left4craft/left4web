// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSession } from 'next-auth/client';
import { connectToDatabase } from '../../../utils/mongodb';
import { stripe } from '../../../utils/stripe';
import { stripe_products } from '../../../utils/stripe_products';

export default async (req, res) => {
	const session = await getSession({ req });
	const { db } = await connectToDatabase();

	const {
		sub, user, uuid
	} = req.query;
	if (session && sub && user && uuid) {

		// step 1: validate the product exists
		if(stripe_products.subscriptions[sub] === undefined) {
			return res.json({
				error: 'Invalid subscription',
				success: false
			});
		}

		try {
			// step 2: get the stripe customer
			const customer = await get_stripe_customer(session, stripe, db);

			// step 3: create the session
			const checkout_session = await stripe.checkout.sessions.create({
				cancel_url: process.env.NEXT_PUBLIC_URL + '/shop/subscription/' + sub,
				customer: customer.id,
				line_items: [
					{
						price: stripe_products.subscriptions[sub].price_id,
						quantity: 1
					}
				],
				metadata: {
					mc_username: user,
					mc_uuid: uuid
				},
				mode: 'subscription',
				payment_method_types: ['card'],
				success_url: process.env.NEXT_PUBLIC_URL + '/shop/success?session_id={CHECKOUT_SESSION_ID}'
			});
			return res.json({
				session_id: checkout_session.id,
				success: true
			});

		} catch (ex) {
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
async function get_stripe_customer(session, stripe, db) {
	const saved_stripe_customer = await db.collection('stripe_customers').findOne({ email: session.user.email });

	// if the stripe user doesn't exist, make a new one
	let customer;
	if(!saved_stripe_customer) {
		customer = await stripe.customers.create({ email: session.user.email });

		await db.collection('stripe_customers').insertOne({
			email: session.user.email,
			stripe_customer_id: customer.id
		});
	} else {
		customer = await stripe.customers.retrieve(saved_stripe_customer.stripe_customer_id);
	}

	return customer;
}
