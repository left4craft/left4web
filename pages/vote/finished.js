import Head from 'next/head';
import { Navbar } from '../../components/navbar';
import { Footer } from '../../components/footer';

export default function VoteFinished() {
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
