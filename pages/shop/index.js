import Head from 'next/head';
import {
	signIn, signOut, useSession
} from 'next-auth/react';
import Link from 'next/link';
import { Profile } from '../../components/profile';
import { Navbar } from '../../components/navbar';
import { Hero } from '../../components/hero';
import { SubscriptionCard } from '../../components/subscription_card';
import { OnlineTime } from '../../components/time_online';
import { Footer } from '../../components/footer';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { stripe } from '../../utils/stripe';

export default function Shop(props) {
	const {
		data: session, loading
	} = useSession();

	const [isAnnual,
		setAnnual] = useState(false);

	return (
		<div>
			<Head>
				<title>Left4Craft | Shop</title>
				<meta name="title" content="Left4Craft | Shop" />
				<meta name="og:title" content="Left4Craft | Shop" />
				<meta name="twitter:title" content="Left4Craft | Shop" />
			</Head>
			<Navbar />
			<Profile loading={loading} session={session} signIn={signIn} signOut={signOut} />

			<Hero title='Shop' />

			<div className="text-white text-center text-4xl bg-dark font-bold">
				<div className="h-8" />
				<h2>Ranks</h2>
			</div>

			<div className="text-white text-center text-l bg-dark p-8">
				<p>Left4Craft has been around for over 8 years, and the best way to support its continued growth is by purchasing a recurring rank.
					<br />
					All players get a 1 month free trial on their first subscription.</p>
				<div className="h-8" />
			</div>

			<div className="flex justify-center bg-dark">
				<div className="relative inline-block w-10 mr-2 align-middle select-none">
					<input type="checkbox" name="toggle" onClick={() => setAnnual(!isAnnual)} id="Annual" className="checked:bg-primary outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-light border-4 appearance-none cursor-pointer" />
					<label htmlFor="Annual" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer">
					</label>
				</div>
				<span className="text-gray-400 font-medium align-middle">
					<b>Annual Billing</b> (save 20%)
				</span>
			</div>
			<div className="flex flex-wrap bg-dark justify-center">
				{props.stripe_subscriptions.map(rank => < SubscriptionCard key={rank.name} rank={rank} annual={ isAnnual } />)}
			</div>
			<OnlineTime />
			<div className="bg-primary bg-grass-pattern bg-repeat bg-fixed animate-pan motion-reduce:animate-none py-20 px-4 text-white">
				<div className="mx-auto max-w-6xl flex flex-col md:flex-row">
					<h2 className="mr-8 w-full md:w-1/3 text-3xl font-extrabold leading-9">
            Frequently-asked questions
					</h2>
					<dl className="w-full md:w-2/3">
						<dt className="mb-4">
							<h3 className="text-xl font-semibold">
                    Why does Left4Craft need money?
							</h3>
						</dt>
						<dd className="mb-16">
							<p>
                    Running a quality Minecraft server can be expensive in the long run. Many
					costs, including domain registration, website hosting, and server hosting are
					ongoing. Subscriptions are the only way to sustainably fund Left4Craft in the long run.
							</p>
						</dd>
						<dt className="mb-4">
							<h3 className="text-xl font-semibold">
                    Is there a free trial? Can I cancel at any time?
							</h3>
						</dt>
						<dd className="mb-16">
							<p>
                    Yes and yes. All <b>Minecraft accounts</b> (not emails) who have not subscribed before will get a free
					30-day trial of any rank, after which billing will begin. Subscriptions can be cancelled at any time,
					for any reason, including during the trial period. For full details, see our <u><Link href="/tos">Terms of Service</Link></u>.
							</p>
						</dd>
						<dt className="mb-4">
							<h3 className="text-xl font-semibold">
                    Can I buy / gift ranks for other people?
							</h3>
						</dt>
						<dd className="mb-16">
							<p>
                    Yes! Simply enter their Minecraft username during the checkout process. You can manage multiple active subscriptions
					at once.
							</p>
						</dd>
						<dt className="mb-4">
							<h3 className="text-xl font-semibold">
                    What are cosmetic coins and keys used for? How do I use them?
							</h3>
						</dt>
						<dd className="mb-16">
							<p>
                    Cosmetic coins and keys can be used to obtain cosmetic items in-game such as balloons, pets, and gadgets. To open the cosmetics
					menu, go to hub, survival, or creative and use &quot;/cosmetics&quot;. To use a key, go to hub (by the party games portal),
					survival spawn, or creative spawn, and right click the chest that says &quot;Open Treasure.&quot;
							</p>
						</dd>
						<dt className="mb-4">
							<h3 className="text-xl font-semibold">
                    Where can I get help with my order?
							</h3>
						</dt>
						<dd className="mb-16">
							<p>
                    You can reach out on the official Discord server linked in the footer of this page or email support@left4craft.org for
					assistance.
							</p>
						</dd>

					</dl>
				</div>
			</div>
			<Footer />
		</div>
	);
}

Shop.propTypes = { stripe_subscriptions: PropTypes.array };

export async function getStaticProps() {

	const products = await stripe.products.list({ limit: 99 });

	const stripe_subscriptions = [];
	for(const product of products.data) {

		// validate subscription metadata
		if(!product.metadata.perks_enabled) continue;
		try {
			JSON.parse(product.metadata.perks_enabled);
			product.metadata.perks_disabled && JSON.parse(product.metadata.perks_disabled);
		} catch (e) {
			// console.log(e);
			continue;
		}

		// get the price
		const prices = (await stripe.prices.search(
			{ query: `active:"true" AND product:"${product.id}" AND type:"recurring"` }
		)).data;
		// skip product if it's missing price data
		if(!prices || prices.length < 2) continue;

		const monthly_idx = prices[0].recurring.interval === 'month' ? 0 : 1;
		const yearly_idx = 1 - monthly_idx;

		stripe_subscriptions.push({
			name: product.name,
			perks_disabled: product.metadata.perks_disabled ? JSON.parse(product.metadata.perks_disabled) : null,
			perks_enabled: JSON.parse(product.metadata.perks_enabled),
			price: [prices[monthly_idx].unit_amount,
				prices[yearly_idx].unit_amount],
			price_id: [prices[monthly_idx].id,
				prices[yearly_idx].id]
		});
	}

	// sort subscriptions by price in ascending order
	stripe_subscriptions.sort((a, b) => a.price[0] - b.price[0]);

	// console.log(JSON.stringify(stripe_subscriptions, null, 2));

	return {
		props: {
			revalidate: 3600,
			stripe_subscriptions: stripe_subscriptions
		}
	};
}

