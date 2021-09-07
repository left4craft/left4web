import Head from 'next/head';
import { useState } from 'react';
import { Homepage } from '../components/homepage';
import { Navbar } from '../components/navbar';
import { Panorama } from '../components/panorama';

export default function Home() {
	// state represents number of images loaded
	const [loaded,
		setLoaded] = useState(0);

	return (
		<div>
			<Head>
				<meta name="title" content="Left4Craft | Portal" />
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
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>

				<div id='content' className='absolute z-20 top-0 left-0 w-full text-center'>
					<Navbar />
					<Homepage loaded={loaded} />
				</div>
				<div id='panorama' className='fixed z-0 top-0 left-0 h-screen w-screen bg-light'>
					<Panorama loaded={loaded} setLoaded={setLoaded} />
				</div>
			</main>
		</div>
	);
}
