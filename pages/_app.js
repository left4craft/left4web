/* eslint-disable react/prop-types */
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/layout';
import 'tailwindcss/tailwind.css';
import '../public/extra.css';
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
					<meta charset="utf-8" />

					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<meta name="keywords" content="Left4Craft, Minecraft, server, portal, wiki, rules, shop, donate" />
					<meta name="author" content="Left4Craft" />
					<meta name="copyright" content="Left4Craft" />
					<meta name="robots" content="index,follow" />
					<meta name="coverage" content="Worldwide" />
					<meta name="distribution" content="Global" />
					<meta name="owner" content="Left4Craft" />
					<meta name="og:type" content="website" />
					<meta name="twitter:domain" content="www.left4craft.org"></meta>
					<meta name="theme-color" content="#66AA44" />

					<meta name="image" content="/images/logo.png" />
					<meta name="og:image" content="/images/logo.png" />
					<meta name="twitter:image" content="/images/logo.png" />

					<meta name="url" content="https://www.left4craft.org" />
					<meta name="og:url" content="https://www.left4craft.org" />

					<meta name="og:site_name" content="Left4Craft" />
					<meta name="twitter:site_name" content="Left4Craft" />

					<meta name="description" content="Left4Craft - a small community Minecraft server with Survival, Creative, and more." />
					<meta name="og:description" content="Left4Craft - a small community Minecraft server with Survival, Creative, and more." />
					<meta name="twitter:description" content="Left4Craft - a small community Minecraft server with Survival, Creative, and more." />


					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Component {...pageProps} />
			</Layout>
		</SessionProvider>
	);
}

