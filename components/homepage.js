import PropTypes from 'prop-types';
import { useState } from 'react';
import { Loader } from './loader';
import { Footer } from './footer';

export function Homepage(props) {
	const [transitionComplete,
		setTransitionComplete] = useState();

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

	return <>
		<div className='h-screen'>
			<p>Content 1</p>
		</div>
		<div className='h-screen'>
			<p>Content 2</p>
		</div>
		<div className='h-screen'>
			<p>Content 3</p>
		</div>
		{/* <div className='h-1 bg-gradient-to-r from-primary to-secondary' /> */}
		<Footer />

	</>;
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
