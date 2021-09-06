import Head from 'next/head';
import { useState } from 'react';
import { Navbar } from '../components/navbar';
import { Panorama } from '../components/panorama';

export default function Home() {
	const [loaded,
		setLoaded] = useState(false);

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

				<div id='content' className='absolute z-10 top-0 left-0 w-full text-center'>
					<Navbar />
					<div className='h-screen'>
						{!loaded && <h1>Loading...</h1>}
					</div>
					<div className='h-screen'>
						<p>Content 2</p>
					</div>
					<div className='h-screen'>
						<p>Content 3</p>
					</div>
					<div className='h-24 bg-dark text-white'>
						<p>Footer Text</p>
					</div>
				</div>
				<div id='panorama' className='fixed z-0 top-0 left-0 h-screen w-screen'>
					<Panorama setLoaded={setLoaded} />
				</div>
			</main>
		</div>
	);
}
