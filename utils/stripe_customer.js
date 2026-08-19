import { query } from './db';

// Get (or lazily create) the Stripe customer for an email.
// Replaces the four copies of get_stripe_customer that queried DynamoDB.
export async function getStripeCustomer(email, stripe) {
	const saved = await query('SELECT stripe_customer_id FROM stripe_customers WHERE email = $1', [email]);

	if (saved.rows[0]) {
		return await stripe.customers.retrieve(saved.rows[0].stripe_customer_id);
	}

	const customer = await stripe.customers.create({ email: email });
	await query(
		`INSERT INTO stripe_customers (email, stripe_customer_id)
		 VALUES ($1, $2)
		 ON CONFLICT (email) DO NOTHING`,
		[email, customer.id]
	);
	return customer;
}
