import Head from 'next/head';
import { Navbar } from '../../../components/navbar';
import { Footer } from '../../../components/footer';
// import Link from 'next/link';

export default function Shop() {
	return (
		<div>
			<Head>
				<title>Left4Craft | Shop</title>
				<meta name="title" content="Left4Craft | Shop" />
			</Head>
			<Navbar />


			<Footer />
		</div>
	);
}
