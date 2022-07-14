import Head from 'next/head';
import { Navbar } from '../../components/navbar';
import { Hero } from '../../components/hero';
import { Footer } from '../../components/footer';

export default function VoteFinished() {
	return (
		<div>
			<Head>
				<title>Left4Craft | Vote</title>
				<meta name="title" content="Left4Craft | Vote" />
				<meta name="og:title" content="Left4Craft | Vote" />
				<meta name="twitter:title" content="Left4Craft | Vote" />
			</Head>
			<Navbar />
			<Hero title='Vote' />
			<div className="text-white bg-dark center flex justify-center items-center">
				<div className="max-w-4xl p-8">
					<div className='font-bold m-4 sm:m-12'>
						<p className='text-4xl'>Thank you for voting.</p>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}
