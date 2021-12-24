import {
	signIn, signOut, useSession
} from 'next-auth/react';
import Link from 'next/link';
import { Profile } from '../../components/profile';
import { Navbar } from '../../components/navbar';
import { SubscriptionCard } from '../../components/subscription_card';
import { OnlineTime } from '../../components/time_online';
import { Footer } from '../../components/footer';
import { useState } from 'react';

export default function Shop() {
	const {
		data: session, loading
	} = useSession();

	const [isAnnual,
		setAnnual] = useState(false);

	return <div>
		<Navbar />
		<Profile loading={loading} session={session} signIn={signIn} signOut={signOut} />

		<div className="text-white text-center text-bold text-6xl bg-gradient-to-r from-primary to-secondary h-80 font-bold">
			<div className="h-32" />
			<h1>Shop</h1>
		</div>

		<div className="text-white text-center text-bold text-4xl bg-dark font-bold">
			<div className="h-8" />
			<h2>Ranks</h2>
		</div>

		<div className="text-white text-center text-l bg-dark p-8">
			<p>Left4Craft has been around for over 8 years, and the best way to support its continued growth is by purchasing a recurring rank.
				<br />
				All players get a 1 month free trial on their first subscription.</p>
			<br />
				Left4Craft is not affiliated with Mojang AB.
			<div className="h-8" />
		</div>

		<div className="flex justify-center bg-dark">
			<div className="relative inline-block w-10 mr-2 align-middle select-none">
				<input type="checkbox" name="toggle" onClick= { () => setAnnual(!isAnnual) } id="Annual" className="checked:bg-primary outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-light border-4 appearance-none cursor-pointer"/>
				<label htmlFor="Annual" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer">
				</label>
			</div>
			<span className="text-gray-400 font-medium align-middle">
				<b>Annual Billing</b> (save 20%)
			</span>
		</div>

		<div className="flex flex-wrap bg-dark justify-center">
			< SubscriptionCard rank="User+" annual={ isAnnual } />
			< SubscriptionCard rank="Donor" annual={ isAnnual } />
			< SubscriptionCard rank="Patron" annual={ isAnnual } />
			< SubscriptionCard rank="Patron+" annual={ isAnnual } />
		</div>
		<OnlineTime />
		<div className="bg-gradient-to-r from-primary to-secondary py-20 px-4 text-white">
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
	</div>;


}
