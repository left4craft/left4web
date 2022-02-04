import PropTypes from 'prop-types';
import {
	useState, useEffect
} from 'react';
import { Loader } from './loader';
import { Footer } from './footer';
import { PlayerHead } from './3d_head';

export function Homepage(props) {
	// state to store whether homepage fully revealed
	const [transitionComplete,
		setTransitionComplete] = useState();

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
		},
		[]
	);

	// whenever the user scrolls, update the mouse position, since it moves with the page
	useEffect(
		() => {
			const delta =  scroll - prevScroll;
			setPrevScroll(scroll);

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
			<div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
				<div className="lg:w-4/5 xl:w-3/5 flex flex-col items-start relative z-10">

					<h1 className="text-left font-bold text-6xl sm:text-7xl text-white outline-4 outline-black leading-tight mt-4">
                Small Community Minecraft
					</h1>
					<div className="relative flex flex-col items-center group">
						<a className="block bg-primary hover:bg-secondary py-3 px-4 rounded-lg text-lg text-white font-bold uppercase mt-10">
						mc.left4craft.org
						</a>
						<div className="absolute bottom-0 flex-col items-center hidden mb-6 group-hover:flex">
							<span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">Click to copy</span>
							<div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
							<div className="h-8" />
						</div>
					</div>

				</div>
			</div>
		</div>
		<div className="flex justify-center text-white mb-auto animate-bounce">
			<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
				<path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
			</svg>
		</div>
		<div className='h-screen flex justify-center'>
			<p>Content 2</p>
			<PlayerHead mousePos={mousePos} scroll={scroll} />
		</div>
		<div className='h-screen'>
			<p>Content 3</p>
		</div>
		{/* <div className='h-1 bg-gradient-to-r from-primary to-secondary' /> */}
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
