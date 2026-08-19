import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Footer } from '../../components/footer';
import { Hero } from '../../components/hero';
import History from '../../components/history';
import { Spinner } from '../../components/loader';
import { Navbar } from '../../components/navbar';
import { Profile } from '../../components/profile';
import { getServerSession } from '../../utils/auth';
import { signIn, signOut, useSession } from '../../utils/auth-client';
import { stripe } from '../../utils/stripe';
import { getStripeCustomer } from '../../utils/stripe_customer';

export default function HistoryPage(props) {
	const { data: session, isPending: loading } = useSession();

	if (loading) {
		return (
			<>
				<Head>
					<title>Left4Craft | Purchase History</title>
					<meta name="title" content="Left4Craft | Purchase History" />
					<meta name="og:title" content="Left4Craft | Purchase History" />
					<meta name="twitter:title" content="Left4Craft | Purchase History" />
				</Head>
				<Navbar />
				<Profile loading={loading} session={session} signIn={signIn} signOut={signOut} />

				<Hero title="Shop" />

				<div className="text-white text-center text-4xl bg-dark font-bold">
					<div className="h-8" />
					<h2>Purchase History</h2>
				</div>
				<div className="text-white text-center text-l bg-dark p-8">
					<Spinner /> Loading...
					<div className="h-8" />
				</div>
				<Footer />
			</>
		);
	}

	if (!session) {
		return (
			<>
				<Head>
					<title>Left4Craft | Purchase History</title>
					<meta name="title" content="Left4Craft | Purchase History" />
					<meta name="og:title" content="Left4Craft | Purchase History" />
					<meta name="twitter:title" content="Left4Craft | Purchase History" />
				</Head>
				<Navbar />
				<Profile loading={loading} session={session} signIn={signIn} signOut={signOut} />

				<Hero title="Shop" />

				<div className="text-white text-center text-4xl bg-dark font-bold">
					<div className="h-8" />
					<h2>Purchase History</h2>
				</div>
				<div className="text-white text-center text-l bg-dark p-8">
					You must{' '}
					<u>
						<Link href="/login">log in</Link>
					</u>{' '}
					to view your purchase history.
					<div className="h-8" />
				</div>
				<Footer />
			</>
		);
	}

	return (
		<div>
			<Head>
				<title>Left4Craft | Purchase History</title>
				<meta name="title" content="Left4Craft | Purchase History" />
				<meta name="og:title" content="Left4Craft | Purchase History" />
				<meta name="twitter:title" content="Left4Craft | Purchase History" />
			</Head>
			<Navbar />
			<Profile loading={loading} session={session} signIn={signIn} signOut={signOut} />

			<Hero title="Shop" />

			<div className="text-white text-center text-4xl bg-dark font-bold">
				<div className="h-8" />
				<h2>Purchase History</h2>
			</div>

			<div className="flex flex-wrap justify-center text-white text-center text-l bg-dark p-8">
				<div className="text-left w-96 relative">
					{props.history.length > 0 ? <History history={props.history} /> : <p>No one-time purchase history.</p>}

					<p className="p-8">To view and manage subscription payments, click &quot;Manage Subscriptions&quot; at the top of this page.</p>
				</div>
				<div className="text-white text-center text-l bg-dark p-8 w-screen">
					<u>
						<Link href="/shop/products">Return to store</Link>
					</u>
				</div>
			</div>

			<Footer />
		</div>
	);
}

HistoryPage.propTypes = { history: PropTypes.array };

export async function getServerSideProps({ req }) {
	const session = await getServerSession(req);

	if (!session) return { props: { history: null } };

	const customer = await getStripeCustomer(session.user.email, stripe);

	const order_history = await stripe.charges.search({
		limit: 99,
		query: `customer:"${customer.id}"`
	});

	const order_history_cleaned = [];

	for (const order of order_history.data) {
		const order_elem = {};
		order_elem.id = order.id;
		order_elem.timestamp = order.created * 1000;
		order_elem.amount = order.amount;
		order_elem.amount_refund = order.amount_refunded;
		order_elem.recipt = order.receipt_url;
		order_history_cleaned.push(order_elem);
	}

	// console.log(JSON.stringify(order_history_cleaned, null, 2));

	return { props: { history: order_history_cleaned } };
}
