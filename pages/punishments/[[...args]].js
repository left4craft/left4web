import fetch from 'node-fetch';
import Head from 'next/head';
import PropTypes from 'prop-types';

import { Navbar } from '../../components/navbar';
import { Footer } from '../../components/footer';
import { InfoTable } from '../../components/punishment';

// type: type of info to display (bans, mutes, info, punishments, etc)
// data: data to display
// success: true if successful, false if not, undefined if loading
export default function Bans({
	data, success, type
}) {
	return (
		<div>
			<Head>
				<title>Left4Craft | Bans</title>
				<meta name="title" content="Left4Craft | Bans" />
			</Head>
			<Navbar />

			<div className="text-white text-center text-bold text-6xl bg-gradient-to-r from-primary to-secondary h-80 font-bold">
				<div className="h-32" />
				<h1>Bans</h1>
			</div>
			<div className='flex justify-center'>
				<div className='w-11/12'>
					<InfoTable data={data} success={success} type={type} />
				</div>

			</div>
			<div>
				<p>Type: {type ? type.join(', ') : ''}</p>
				<p>Data: {JSON.stringify(data)}</p>
				<p>Success: {success ? 'true' : 'false'} </p>
			</div>
			<Footer />
		</div>
	);
	// return(
	// 	<>
	// 		<p>Type: {type ? type.join(', ') : ''}</p>
	// 		<p>Data: {JSON.stringify(data)}</p>
	// 		<p>Success: {success ? 'true' : 'false'} </p>
	// 	</>
	// );
}

export async function getStaticProps({ params }) {
	const args = params.args || ['bans',
		'1'];

	// /punishments/[punishment]
	if(args[0] === 'bans'||
        args[0] === 'mutes' ||
        args[0] === 'kicks' ||
        args[0] === 'warnings') {
		if(args.length === 1) {
			args.push('1'); // default to viewing first page
		}

		// if argument is a number, then viewing /punishments/[punishment]/[page]
		if(/^[0-9]{1,5}$/.test(args[1])) {
			const response = await fetch(`${process.env.LITEBANS_API}/list?type=${args[0]}&page=${Number(args[1])-1}&perPage=15&apiKey=${process.env.LITEBANS_API_KEY}`);
			const data = await response.json();

			return {
				props: {
					data: data,
					success: true,
					type: ['list',
						args[0]]
				}, // will be passed to the page component as props
				revalidate: 300
			};

			// viewing /punishments/[punishment]/info/[id]
		} else if(args.length === 3 && args[1] === 'info' && /^[0-9]{1,5}$/.test(args[2])) {
			const response = await fetch(`${process.env.LITEBANS_API}/info?type=${args[0]}&id=${args[2]}&apiKey=${process.env.LITEBANS_API_KEY}`);
			const data = await response.json();

			return {
				props: {
					data: data,
					success: true,
					type: ['info',
						args[0]]
				}, // will be passed to the page component as props
				revalidate: 300
			};
		}
	}

	// /punishments/by/[uuid]/[page] or /punishments/for/[uuid]/[page]
	if((args[0] === 'by' || args[0] === 'for') &&
        args.length >= 2 &&
        /^[0-9a-zA-Z-]{36}$/.test(args[1])) {

		// default to first page
		if(args.length === 2) {
			args.push('1');
		}

		// check page number is valid
		if(/^[0-9]{1,5}$/.test(args[2])) {
			const response = await fetch(`${process.env.LITEBANS_API}/history?type=${args[0]}&page=${Number(args[2])-1}&perPage=15&uuid=${args[1]}&apiKey=${process.env.LITEBANS_API_KEY}`);
			const data = await response.json();

			return {
				props: {
					data: data,
					success: true,
					type: ['history',
						args[0]]
				}, // will be passed to the page component as props
				revalidate: 300
			};

		}
	}

	return {
		props: { success: false },
		revalidate: 300
	};
}

export async function getStaticPaths() {
	return {
		fallback: true,
		paths: [
			'/punishments',
			'/punishments/bans/1',
			'/punishments/mutes/1',
			'/punishments/kicks/1',
			'/punishments/warnings/1'
		]
	};
}

Bans.propTypes = {
	data: PropTypes.object,
	success: PropTypes.bool,
	type: PropTypes.array
};

