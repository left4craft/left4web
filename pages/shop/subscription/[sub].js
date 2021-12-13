import { useRouter } from 'next/router';
import {
	signIn, signOut, useSession
} from 'next-auth/react';
import { Profile } from '../../../components/profile';
import { Navbar } from '../../../components/navbar';
import { Footer } from '../../../components/footer';
// import { useState } from 'react';

export default function Shop() {
	const router = useRouter();
	const { sub } = router.query;
	const {
		data: session, loading
	} = useSession();

	return <div>
		<Navbar />
		<Profile loading={loading} session={session} signIn={signIn} signOut={signOut} />

		<div className="text-white text-center text-bold text-6xl bg-gradient-to-r from-primary to-secondary h-80 font-bold">
			<div className="h-32" />
			<h1>Shop</h1>
		</div>

		<div className="text-white text-center text-bold text-4xl bg-dark font-bold">
			<div className="h-8" />
			<h2>Subscribe to { sub }</h2>
		</div>

		<div className="text-white text-center text-l bg-dark p-8">
			<p>Left4Craft has been around for over 8 years, and the best way to support its continued growth is by purchasing a recurring rank.
				<br />
				All players get a 1 month free trial on their first subscription.</p>
			<div className="h-8" />
		</div>

		<Footer />
	</div>;


}