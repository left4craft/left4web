import Head from 'next/head';
// import Image from 'next/image';

export default function Home() {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
				{/* <meta name="title" content="Left4Craft | Portal" />
				<meta name="description"content="Left4Craft - a small community Minecraft server with Survival, Creative, and more." />
				<meta name="keywords" content="Left4Craft, Minecraft, server, portal, wiki, rules, shop, donate" />
				<meta name="author" content="Left4Craft, eartharoid@left4craft.org" />
				<meta name="copyright" content="Left4Craft" />
				<meta name="robots" content="index,follow" />
				<meta name="coverage" content="Worldwide" />
				<meta name="distribution" content="Global" />
				<meta name="owner" content="Left4Craft" />
				<meta name="url" content="https://www.left4craft.org" />
				<meta name="og:title" content="Left4Craft | Portal" />
				<meta name="og:url" content="https://www.left4craft.org" />
				<meta name="og:image" content="/assets/img/logo.png" />
				<meta name="og:site_name" content="Left4Craft" />
				<meta name="og:description" content="Left4Craft - a small community Minecraft server with Survival, Creative, and more." />
				<meta name="theme-color" content="#66AA44" />
				<link rel="icon" href="/favicon.ico" /> */}
			</Head>

			<main>
				<div id='panorama'></div>
				<div className="container mx-auto">
					<h1>Left4Craft</h1>
				</div>
			</main>
			<script type='module' src='/js/panorama.js' />
		</div>
	);
}
