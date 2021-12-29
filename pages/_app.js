/* eslint-disable react/prop-types */
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/layout';
import 'tailwindcss/tailwind.css';
import Head from 'next/head';

export default function App({
	Component,
	pageProps: {
		session, ...pageProps
	}
}) {
	return (
		<SessionProvider session={session}>
			<Layout>
				<Head>
					<meta name="description" content="Left4Craft - a small community Minecraft server with Survival, Creative, and more." />
					<meta name="keywords" content="Left4Craft, Minecraft, server, portal, wiki, rules, shop, donate" />
					<meta name="author" content="Left4Craft, eartharoid@left4craft.org" />
					<meta name="copyright" content="Left4Craft" />
					<meta name="robots" content="index,follow" />
					<meta name="coverage" content="Worldwide" />
					<meta name="distribution" content="Global" />
					<meta name="owner" content="Left4Craft" />
					<meta name="url" content="https://www.left4craft.org" />
					<meta name="og:title" content="Left4Craft | Home" />
					<meta name="og:url" content="https://www.left4craft.org" />
					<meta name="og:image" content="/public/images/logo.png" />
					<meta name="og:site_name" content="Left4Craft" />
					<meta name="og:description" content="Left4Craft - a small community Minecraft server with Survival, Creative, and more." />
					<meta name="theme-color" content="#66AA44" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Component {...pageProps} />
			</Layout>
		</SessionProvider>
	);
}

