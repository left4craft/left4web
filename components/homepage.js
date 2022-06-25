import PropTypes from 'prop-types';
import {
	useState, useEffect
} from 'react';
import { Loader } from './loader';
import { Footer } from './footer';
import { PlayerHead } from './3d_head';
import Link from 'next/link';

export function Homepage(props) {
	// state to store whether homepage fully revealed
	const [transitionComplete,
		setTransitionComplete] = useState(false);

	// state to store whether to fade out the text boxes
	const [fadeTextbox,
		setFadeTextBox] = useState(false);

	// state for copy to clipboard text
	const [copyText,
		setCopyText] = useState('Click to copy');


	// state to help with head facing direction
	const [mousePos,
		setMousePos] = useState({
		x: 0,
		y: 0
	});
	const [scroll,
		setScroll] = useState(0);
	const [prevScroll,
		setPrevScroll] = useState(0);

	// update the scrolling state
	useEffect(
		() => {
			document.addEventListener('scroll', () => {
				setScroll(window.scrollY);
			});

			return () => {
				document.removeEventListener('scroll', () => {
					setScroll(window.scrollY);
				});
			};
		},
		[]
	);

	// whenever the user scrolls, update the mouse position, since it moves with the page
	useEffect(
		() => {
			const delta =  scroll - prevScroll;
			setPrevScroll(scroll);

			if(!fadeTextbox && scroll > 240) {
				setFadeTextBox(true);
			}

			setMousePos({
				x: mousePos.x,
				y: mousePos.y + delta
			});
		},
		[scroll]
	);

	if (!transitionComplete && props.loaded) {
		setTimeout(() => {
			setTransitionComplete(true);
		}, 1000);
	}

	if(!transitionComplete) {
		return <>
			<div className={'fixed top-16 left-0 bg-light text-white w-screen h-screen' + (props.loaded ? ' animate-fade' : '') } >
				<br />
				<noscript>This site works best with Javascript enabled.</noscript>
				<br />
				<b>Left4Craft</b>
				<p>mc.left4craft.org</p>
				<div className='flex flex-row justify-center'>
					<Loader height={60} width={60} color={'4caf50'} />
				</div>
				<p>Loading...</p>
			</div>
		</>;
	}

	return <div onMouseMove={
		e => {
			setMousePos({
				x: e.pageX,
				y: e.pageY
			});
			// console.log(mousePos);
		}
	}>
		<div className='h-[80vh]' >
			<div className={`${scroll < 80 ? 'animate-fade-in opacity-100' : 'animate-fade-out opacity-0 cursor-default'} container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40`}>
				<div className="lg:w-4/5 xl:w-3/5 flex flex-col items-start relative z-10">

					<h1 className="select-none text-left font-bold text-6xl sm:text-7xl text-white leading-tight mt-4 drop-shadow-lg">
						Small Community Minecraft
					</h1>
					<div className="relative flex flex-col items-center group cursor-pointer"
						onClick={() => {
							const elem = document.getElementById('l4c-ip-address');
							const select = window.getSelection();
							const range = document.createRange();

							range.selectNodeContents(elem);
							select.addRange(range);
							try {
								navigator.clipboard.writeText('mc.left4craft.org').then(() => {
									setCopyText('Copied!');
									setTimeout(() => {
										setCopyText('Click to copy');
									}, 2000);
								}, () => {
									setCopyText('Failed to copy');
									setTimeout(() => {
										setCopyText('Click to copy');
									}, 2000);
								});
							// in case the user has an extremely old browser
							// or clipboard permissions change in a future version of Chromium/Firefox
							} catch (e) {
								setCopyText('Failed to copy');
								setTimeout(() => {
									setCopyText('Click to copy');
								}, 2000);
							}
						}}>
						<div id='l4c-ip-address' className="block bg-primary hover:bg-secondary py-3 px-4 rounded-lg text-lg text-white font-bold uppercase mt-10 transition ease-in duration-200">
							mc.left4craft.org
						</div>
						<div className="absolute bottom-0 flex-col items-center mb-6 flex opacity-0 group-hover:opacity-100 transition ease-in duration-500">
							<span className="select-none relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">{copyText}</span>
							<div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
							<div className="h-8" />
						</div>
					</div>

				</div>
			</div>
		</div>
		<div className={`${scroll < 80 ? 'opacity-100' : 'opacity-0'} flex justify-center text-white mb-auto animate-bounce transition duration-1000`}>
			<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
				<path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
			</svg>
		</div>
		<div className={`${scroll > 240 ? 'animate-fade-in opacity-100' : `opacity-0 cursor-default ${fadeTextbox ? 'animate-fade-out' : ''}`} flex flex-wrap justify-center items-center text-center gap-8`}>
			<div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4">
				<div className='relative'>
					<PlayerHead mousePos={mousePos} scroll={scroll} scale={3} player='eartharoid' />
					<div className="absolute top-16 bg-dark px-4 py-6 mt-6 shadow-lg rounded-lg bg-opacity-80">
						<h3 className="text-2xl sm:text-xl font-semibold text-white py-4">
							Survival
						</h3>
						<p className="text-md text-gray-300 py-4">
							Encompassing today&apos;s website design technology to integrated and build solutions relevant to your business.
						</p>
					</div>
				</div>
			</div>
			<div className='w-screen h-20 lg:hidden' />
			<div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4">
				<div className='relative'>
					<PlayerHead mousePos={mousePos} scroll={scroll} scale={3} player='captain_sisko' />
					<div className="absolute top-16 bg-dark px-4 py-6 mt-6 shadow-lg rounded-lg bg-opacity-80">
						<h3 className="text-2xl sm:text-xl font-semibold text-white py-4">
							Creative
						</h3>
						<p className="text-md text-gray-300 py-4">
							Encompassing today&apos;s website design technology to integrated and build solutions relevant to your business.
							aSDKJA  paskd ioasd aiosd oasijd iouwh euihqwebsxcnb ajskdh asjkhd ajkd asjkhd
							iaushd asuihd ashuid auisd iasdh uasuidh aiuhsd aid aisdh asuidh

						</p>
					</div>
				</div>
			</div>
			<div className='w-screen h-40 lg:hidden' />
			<div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4">
				<div className='relative'>
					<PlayerHead mousePos={mousePos} scroll={scroll} scale={3} player='cpt_myles' />
					<div className="absolute top-16 bg-dark px-4 py-6 mt-6 shadow-lg rounded-lg bg-opacity-80">
						<h3 className="text-2xl sm:text-xl font-semibold text-white py-4">
							Party Games
						</h3>
						<p className="text-md text-gray-300 py-4">
							Encompassing today&apos;s website design technology to integrated and build solutions relevant to your business.
							Longggg
						</p>
					</div>
				</div>
			</div>

		</div>
		<div className="h-64" />
		<div className={`${scroll > 240 ? 'animate-fade-in opacity-100' : `opacity-0 cursor-default ${fadeTextbox ? 'animate-fade-out' : ''}`} flex flex-wrap justify-center items-center text-center gap-8`}>
			<div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4">
				<div className='relative'>
					<PlayerHead mousePos={mousePos} scroll={scroll} scale={3} player='snickreny' />
					<div className="absolute top-16 bg-dark px-4 py-6 mt-6 shadow-lg rounded-lg bg-opacity-80">
						<h3 className="text-2xl sm:text-xl font-semibold text-white py-4">
							Since 2013
						</h3>
						<p className="text-md text-gray-300 py-4">
							Encompassing today&apos;s website design technology to integrated and build solutions relevant to your business.
						</p>
					</div>
				</div>
			</div>
			<div className='w-screen h-20 lg:hidden' />
			<div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4">
				<div className='relative'>
					<PlayerHead mousePos={mousePos} scroll={scroll} scale={3} player='twigo' />
					<div className="absolute top-16 bg-dark px-4 py-6 mt-6 shadow-lg rounded-lg bg-opacity-80">
						<h3 className="text-2xl sm:text-xl font-semibold text-white py-4">
							Custom Code
						</h3>
						<p className="text-md text-gray-300 py-4">
							Encompassing today&apos;s website design technology to integrated and build solutions relevant to your business.
							aSDKJA  paskd ioasd aiosd oasijd iouwh euihqwebsxcnb ajskdh asjkhd ajkd asjkhd
							iaushd asuihd ashuid auisd iasdh uasuidh aiuhsd aid aisdh asuidh

						</p>
					</div>
				</div>
			</div>
			<div className='w-screen h-40 lg:hidden' />
			<div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4">
				<div className='relative'>
					<PlayerHead mousePos={mousePos} scroll={scroll} scale={3} player='xtimbo' />
					<div className="absolute top-16 bg-dark px-4 py-6 mt-6 shadow-lg rounded-lg bg-opacity-80">
						<h3 className="text-2xl sm:text-xl font-semibold text-white py-4">
							Blazing Fast
						</h3>
						<p className="text-md text-gray-300 py-4">
							Encompassing today&apos;s website design technology to integrated and build solutions relevant to your business.
							Longggg
						</p>
					</div>
				</div>
			</div>

		</div>

		<div className='h-[60vh]' />
		<div className='container mx-auto px-6 md:px-12 relative z-10 flex items-center'>
			<div className="lg:flex lg:items-center lg:justify-between w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
				<h2 className="text-3xl font-extrabold text-white sm:text-4xl drop-shadow-lg">
					<span className="block">
						Ready to join Left4Craft?
					</span>
				</h2>
				<div className="lg:mt-0 lg:flex-shrink-0 py-8">
					<div className="inline-flex rounded-md">
						<div className="relative flex flex-col items-center group cursor-pointer"
							onClick={() => {
								const elem = document.getElementById('l4c-ip-address');
								const select = window.getSelection();
								const range = document.createRange();

								range.selectNodeContents(elem);
								select.addRange(range);
								try {
									navigator.clipboard.writeText('mc.left4craft.org').then(() => {
										setCopyText('Copied!');
										setTimeout(() => {
											setCopyText('Click to copy');
										}, 2000);
									}, () => {
										setCopyText('Failed to copy');
										setTimeout(() => {
											setCopyText('Click to copy');
										}, 2000);
									});
									// in case the user has an extremely old browser
									// or clipboard permissions change in a future version of Chromium/Firefox
								} catch (e) {
									setCopyText('Failed to copy');
									setTimeout(() => {
										setCopyText('Click to copy');
									}, 2000);
								}
							}}>
							<div id='l4c-ip-address' className="block bg-primary hover:bg-secondary py-3 px-4 rounded-lg text-lg text-white font-bold uppercase mt-10 transition ease-in duration-200">
							mc.left4craft.org
							</div>
							<div className="absolute bottom-0 flex-col items-center mb-6 flex opacity-0 group-hover:opacity-100 transition ease-in duration-500">
								<span className="select-none relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">{copyText}</span>
								<div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
								<div className="h-8" />
							</div>
						</div>

					</div>
					<div className="px-5 inline-flex rounded-md">
						<div className="cursor-pointer">
							<Link href="https://discord.left4craft.org" className="relative flex flex-col items-center group" passHref>
								<div id='l4c-ip-address' className="block bg-dark hover:bg-light py-3 px-4 rounded-lg text-lg text-white font-bold uppercase mt-10 transition ease-in duration-200">
									Discord
								</div>
							</Link>
						</div>

					</div>
				</div>
			</div>
		</div>
		<div className='h-24' />

		<div className='h-1 bg-gradient-to-r from-primary to-secondary' />


		<Footer />

	</div>;
}

Homepage.propTypes = { loaded: PropTypes.bool };

// // https://stackoverflow.com/questions/2446740/post-loading-check-if-an-image-is-in-the-browser-cache/50111407#50111407
// function isCached(src) {
// 	const img = document.createElement('img');
// 	img.src = src;
// 	const complete = img.complete;
// 	img.src = '';
// 	return complete;
// }
