import { getServerSession } from '../../../utils/auth';
import { query } from '../../../utils/db';
import { stripe } from '../../../utils/stripe';
import { getStripeCustomer } from '../../../utils/stripe_customer';

export default async (req, res) => {
	const session = await getServerSession(req);

	const { sub, user, uuid } = req.query;

	// use regex to protect against injection attacks
	if (session && sub && user && uuid && /^[0-9a-zA-Z_]{1,16}$/.test(user) && /^[0-9a-zA-Z-]{36}/.test(uuid)) {
		try {
			// step 1: check if user has free trial
			const free_trial = await has_free_trial(uuid);

			// step 2: get the stripe customer
			const customer = await getStripeCustomer(session.user.email, stripe);

			// step 3: create the session
			const sub_data = {
				metadata: {
					mc_username: user,
					mc_uuid: uuid
				}
			};

			if (free_trial) {
				sub_data.trial_period_days = 30;
			}

			const checkout_session = await stripe.checkout.sessions.create({
				allow_promotion_codes: true,
				cancel_url: process.env.NEXT_PUBLIC_URL + '/shop',
				customer: customer.id,
				line_items: [
					{
						price: sub,
						quantity: 1
					}
				],
				mode: 'subscription',
				payment_method_types: ['card'],
				subscription_data: sub_data,
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
	} else {
		return res.json({
			error: 'Unauthorized',
			success: false
		});
	}
};

// helper function to determine whether a user is eligeble for a free trial
async function has_free_trial(uuid) {
	const account = await query('SELECT mc_uuid FROM stripe_trials WHERE mc_uuid = $1', [uuid]);
	return account.rows.length === 0;
}
