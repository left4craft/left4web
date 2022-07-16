import Head from 'next/head';
import { Navbar } from '../../components/navbar';
import { Hero } from '../../components/hero';
import { Footer } from '../../components/footer';
import Link from 'next/link';
import {
	hasCookie, deleteCookie
} from 'cookies-next';
import { useEffect } from 'react';
export default function ShopFinished() {
	// clear cookies on shopping success
	useEffect(() => {
		if(hasCookie('cart')) deleteCookie('cart');
	}, []);

	return (
		<div>
			<Head>
				<title>Left4Craft | Shop</title>
				<meta name="title" content="Left4Craft | Shop" />
				<meta name="og:title" content="Left4Craft | Shop" />
				<meta name="twitter:title" content="Left4Craft | Shop" />
			</Head>
			<Navbar />
			<Hero title='Shop' />
			<div className="text-white text-center text-4xl font-bold p-8">
				<div className="h-8" />
				<h2>Thanks for Contributing to Left4Craft</h2>
			</div>
			<div className="text-white text-center text-l p-8">
				<p>You will recieve an email with your recipt shortly.</p>
			</div>
			<div className="text-white text-center text-l p-8">
				<u><Link href="/shop/products">View Order History</Link></u>
			</div>
			<div className="text-white text-center text-l p-8">
				<u><Link href="/shop">Return to store</Link></u>
			</div>

			<Footer />
		</div>
	);
}
