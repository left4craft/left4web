import { getServerSession } from '../../../utils/auth';
import { stripe } from '../../../utils/stripe';
import { getStripeCustomer } from '../../../utils/stripe_customer';

export default async (req, res) => {
	const session = await getServerSession(req);

	if (session) {
		try {
			// step 1: get the stripe customer
			const customer = await getStripeCustomer(session.user.email, stripe);

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
