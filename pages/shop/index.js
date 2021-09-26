import {
	signIn, signOut, useSession
} from 'next-auth/client';
import { Profile } from '../../components/profile';
import { Navbar } from '../../components/navbar';
import { SubscriptionCard } from '../../components/subscription_card';
import { useState } from 'react';

export default function Shop() {
	const [session,
		loading] = useSession();

	const [isAnnual,
		setAnnual] = useState(false);

	return <div className="bg-light h-screen text-white text">
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
				All subscription ranks include a 1 month free trial.</p>
			<div className="h-8" />
		</div>

		<div className="flex justify-center bg-dark">
			<div className="relative inline-block w-10 mr-2 align-middle select-none">
				<input type="checkbox" name="toggle" onClick= { () => setAnnual(!isAnnual) } id="Annual" className="checked:bg-primary outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
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

	</div>;


}
