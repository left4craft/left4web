import Head from 'next/head';
import { Navbar } from '../../components/navbar';
import { Footer } from '../../components/footer';
import {
	FaExternalLinkAlt,
	FaSpinner
} from 'react-icons/fa';
import Router from 'next/router';
import {
	useEffect,
	useState
} from 'react';

const sites = [
	{
		name: 'Planet Minecraft',
		url: 'https://www.planetminecraft.com/server/left4craft-survival-horde-no-lag-247'
	},
	{
		name: 'Google',
		url: 'https://google.com'
	},
	{
		name: 'Bing',
		url: 'https://bing.com'
	}
];

export default function Vote() {
	const [opened,
		setOpened] = useState(null);
	useEffect(() => {
		if (opened === null) return;
		const popup = window.open(sites[opened].url);
		const pollTimer = window.setInterval(() => {
			if (popup.closed !== false) {
				window.clearInterval(pollTimer);
				console.log('closed');
				if (opened === sites.length - 1) {
					Router.push('/vote/finished');
				} else {
					setOpened(opened + 1);
				}
			}
		}, 200);
	}, [opened]);

	return (
		<div>
			<Head>
				<title>Left4Craft | Vote</title>
				<meta name="title" content="Left4Craft | Vote" />
			</Head>
			<Navbar />
			<div className="text-white text-center text-6xl bg-gradient-to-r from-primary to-secondary h-80 font-bold">
				<div className="h-32" />
				<h1>Vote</h1>
			</div>
			<div className="text-white bg-dark">
				<div className="max-w-5xl p-8 mx-auto">
					<div className='grid grid-cols-1 sm:grid-cols-2'>
						<div className='text-center'>
							<p>
								Click the button below to open the first vote site in a new tab.
								When you close the tab, the next site will be opened automatically.
								<br></br>
								<button onClick={() => setOpened(0)} type="button" disabled={opened !== null} className="py-2 px-4 m-4 bg-primary enabled:hover:bg-secondary disabled:opacity-75 disabled:cursor-not-allowed  active:bg-secondary focus:outline-none focus:ring focus:ring-white text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg md:w-56">
									<span>
										{opened === null
											? 'Vote'
											: <span className='flex items-center gap-1'><FaSpinner className="animate-spin"></FaSpinner>  <span>Voting at {sites[opened].name}</span></span>
										}

									</span>
								</button>
							</p>
							<hr className='m-4 border-light'></hr>
							<p>
								Alternatively, you can open each site yourself using the links below.
								<ol className='p-4'>
									{sites.map((site, i) => (
										<li key={i} className='underline'>
											<a href={site.url} target="_blank" rel="noreferrer">
												<button type="button" className="py-2 px-4 m-1 bg-light hover:bg-secondary active:bg-secondary focus:outline-none focus:ring focus:ring-white text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg md:w-56">
													<span className='flex items-center gap-1'>
														<span>{i + 1}. {site.name}</span>
														<FaExternalLinkAlt></FaExternalLinkAlt>
													</span>
												</button>
											</a>
										</li>
									))}
								</ol>
							</p>
						</div>
						<div>
							<div className='bg-light shadow-md mx-4 sm:mx-16 p-4 sm:p-8 max-w rounded-lg grid grid-cols-1 gap-6'>
								<p className='text-gray-300'>
									<h6 className='text-white text-lg font-semibold'>Why vote?</h6>
									Hello.
								</p>
								<p className='text-gray-300'>
									<h6 className='text-white text-lg font-semibold'>Rewards</h6>
									Hello.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
