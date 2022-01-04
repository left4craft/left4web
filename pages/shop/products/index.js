import Head from 'next/head';
import {
	signIn,
	signOut,
	useSession
} from 'next-auth/react';
import { Navbar } from '../../../components/navbar';
import { Profile } from '../../../components/profile';
import { Footer } from '../../../components/footer';
import ProductCard from '../../../components/product_card';

export default function Shop() {
	const {
		data: session, loading
	} = useSession();

	return (
		<div>
			<Head>
				<title>Left4Craft | Shop</title>
				<meta name="title" content="Left4Craft | Shop" />
			</Head>
			<Navbar />
			<Profile loading={loading} session={session} signIn={signIn} signOut={signOut} />
			<div className="text-white text-center text-6xl bg-gradient-to-r from-primary to-secondary h-80 font-bold">
				<div className="h-32" />
				<h1>Shop</h1>
			</div>

			<div className="container mx-auto my-8 px-4 sm:px-6 lg:px-8 xl:px-24">
				<h2 className="text-white font-bold text-4xl my-8">Ranks</h2>
				<div className="flex overflow-x-scroll pb-2 snap-x snap-mandatory touch-pan-x scroll-smooth">
					<ProductCard
						name="User+ Lifetime"
						slug="user-plus-lifetime"
						image="https://static.eartharoid.me/sharex/22/01/VIP%20Orange.png"
						price="$9.99"
					/>
					<ProductCard
						name="Donor Lifetime"
						slug="donor-lifetime"
						image="https://static.eartharoid.me/sharex/22/01/VIP%20Cyan.png"
						price="$29.99"
					/>
					<ProductCard
						name="Patron Lifetime"
						slug="patron-lifetime"
						image="https://static.eartharoid.me/sharex/22/01/VIP%20Red.png"
						price="$49.99"
					/>
				</div>
			</div>
			<Footer />
		</div>
	);
}
