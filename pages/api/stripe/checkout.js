import { getCookie } from 'cookies-next';
import { getServerSession } from '../../../utils/auth';
import { stripe } from '../../../utils/stripe';
import { getStripeCustomer } from '../../../utils/stripe_customer';

export default async (req, res) => {
	const session = await getServerSession(req);

	if (!session) {
		return res.json({
			error: 'Unauthorized',
			success: false
		});
	}

	const { user, uuid } = req.query;

	const cart = getCookie('cart', {
		req,
		res
	});

	const line_items = [];
	try {
		for (const [id, product] of Object.entries(JSON.parse(cart))) {
			const item = {
				price: id,
				quantity: product.quantity
			};
			if (!product.limit_one) {
				item.adjustable_quantity = {
					enabled: true,
					maximum: product.unlimited_quantity ? 999 : 99
				};
			}
			line_items.push(item);
		}
	} catch (e) {
		console.error(e);
		return res.json({
			error: 'Invalid cart',
			success: false
		});
	}

	try {
		// step 1: get the stripe customer
		const customer = await getStripeCustomer(session.user.email, stripe);
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
