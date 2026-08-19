import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { SearchBar } from '../../components/ban_search';
import { Footer } from '../../components/footer';
import { Hero } from '../../components/hero';
import { HistoryTable } from '../../components/history_table';
import { InfoTable } from '../../components/info_table';
import { ListTable } from '../../components/list_table';
import { Loader } from '../../components/loader';
import { Navbar } from '../../components/navbar';
import { list } from '../../utils/litebans';

// type: type of info to display (bans, mutes, info, punishments, etc)
// data: data to display
// success: true if successful, false if not, undefined if loading
export default function Bans({ data, success, type }) {
	const [errorMessage, setErrorMessage] = useState('');
	const [title, setTitle] = useState('Recent Punishments');

	useEffect(() => {
		if (type === undefined) return;
		if (type[0] === 'list') {
			if (type[1] === 'bans') {
				setTitle('Recent Bans');
			} else if (type[1] === 'mutes') {
				setTitle('Recent Mutes');
			} else if (type[1] === 'kicks') {
				setTitle('Recent Kicks');
			} else if (type[1] === 'warnings') {
				setTitle('Recent Warnings');
			}
		} else if (type[0] === 'history') {
			setTitle(`Punishments ${type[1]} ${data.minecraft.username}`);
		} else if (type[0] === 'info' && type[2]) {
			if (type[1] === 'bans') {
				setTitle(`Ban #${type[2]}`);
			} else if (type[1] === 'mutes') {
				setTitle(`Mute #${type[2]}`);
			} else if (type[1] === 'kicks') {
				setTitle(`Kick #${type[2]}`);
			} else if (type[1] === 'warnings') {
				setTitle(`Warning #${type[2]}`);
			}
		}
	}, [type]);

	if (success === undefined) {
		return (
			<div>
				<Head>
					<title>Left4Craft | Bans</title>
					<meta name="title" content="Left4Craft | Bans" />
					<meta name="og:title" content="Left4Craft | Bans" />
					<meta name="twitter:title" content="Left4Craft | Bans" />
				</Head>
				<Navbar />
				<Hero title="Punishments" />
				<div className="text-white text-center text-4xl bg-dark font-bold">
					<div className="h-8" />
					<h2>Loading</h2>
				</div>
				<div className="h-8" />
				<div className="h-96">
					<div className="flex flex-row justify-center w-screen">
						<Loader height={60} width={60} color={'4caf50'} />
					</div>
					{/* <div className='text-white text-center w-screen'>
						<p>Loading...</p>
					</div> */}
				</div>
				<Footer />
			</div>
		);
	} else if (success === false) {
		return (
			<div>
				<Head>
					<title>Left4Craft | Bans</title>
					<meta name="title" content="Left4Craft | Bans" />
					<meta name="og:title" content="Left4Craft | Bans" />
					<meta name="twitter:title" content="Left4Craft | Bans" />
				</Head>
				<Navbar />
				<Hero title="Punishments" />
				<div className="text-white text-center text-4xl bg-dark font-bold">
					<div className="h-8" />
					<h2>Error</h2>
				</div>
				<div className="h-8" />
				<div className="h-96">
					<div className="text-white text-center w-screen">
						<p>Invalid URL</p>
						<div className="h-8" />
						<div className="h-16 flex justify-center text-white">
							<Link href="/punishments" passHref legacyBehavior>
								<button className="bg-light hover:bg-secondary h-12 px-8 rounded-lg focus:outline-none transition ease-in duration-200">
									Back to List
								</button>
							</Link>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
	return (
		<div>
			<Head>
				<title>Left4Craft | Bans</title>
				<meta name="title" content="Left4Craft | Bans" />
				<meta name="og:title" content="Left4Craft | Bans" />
				<meta name="twitter:title" content="Left4Craft | Bans" />
			</Head>
			<Navbar />
			<Hero title="Punishments" />
			<div className="text-white text-center text-4xl bg-dark font-bold">
				<div className="h-8" />
				<h2>{title}</h2>
			</div>
			<div className="h-8" />
			<div className="flex justify-center">
				<SearchBar setErrorText={setErrorMessage} />
			</div>
			<div className="text-red-500 text-center">{errorMessage}</div>
			<div className="h-8" />
			<div className="flex justify-center">
				<div className="w-11/12">
					{type[0] === 'list' && <ListTable data={data} success={success} type={type} />}
					{type[0] === 'history' && <HistoryTable data={data} success={success} type={type} />}
					{type[0] === 'info' && <InfoTable data={data} success={success} type={type} />}
				</div>
			</div>
			<div className="h-8" />
			<div className="flex justify-center">
				<div className="text-white">Last updated {data === undefined ? 'loading' : new Date(data.timestamp).toLocaleString()}</div>
			</div>
			<div className="h-8" />
			{/* <div>
				<p>Type: {type ? type.join(', ') : ''}</p>
				<p>Data: {JSON.stringify(data)}</p>
				<p>Success: {success ? 'true' : 'false'} </p>
			</div> */}
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

Bans.propTypes = {
	data: PropTypes.object,
	success: PropTypes.bool,
	type: PropTypes.array
};

// /punishments always shows the first page of recent bans
export async function getStaticProps() {
	try {
		const data = await list('bans', 0, 15);
		data.timestamp = Date.now();

		return {
			props: {
				data: data,
				success: data.success,
				type: ['list', 'bans']
			}, // will be passed to the page component as props
			revalidate: 300
		};
	} catch (e) {
		console.error(e);
		return {
			props: { success: false },
			revalidate: 300
		};
	}
}
