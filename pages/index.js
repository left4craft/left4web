import Head from 'next/head';
import { useState } from 'react';
import { Homepage } from '../components/homepage';
import { Navbar } from '../components/navbar';
import { Panorama } from '../components/panorama';

export default function Home() {
	// state represents number of images loaded
	const [loaded,
		setLoaded] = useState(false);

	return (
		<div>
			<Head>
				<title>Left4Craft | Home</title>
				<meta name="title" content="Left4Craft | Home" />
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
