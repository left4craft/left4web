import PropTypes from 'prop-types';
import { useState } from 'react';
import { Loader } from './loader';
import { Footer } from './footer';

export function Homepage(props) {
	const [transitionComplete,
		setTransitionComplete] = useState(false);

	if (!transitionComplete && props.loaded >= 6) {
		setTimeout(() => {
			setTransitionComplete(true);
		}, 1000);
	}

	if(!transitionComplete) {
		return <>
			<div className={'fixed top-16 left-0 bg-light text-white w-screen h-screen' + (props.loaded >= 6 ? ' animate-fade' : '') } >
				<br />
				<noscript>This site works best with Javascript enabled.</noscript>
				<br />
				<b>Left4Craft</b>
				<p>mc.left4craft.org</p>
				<div className='flex flex-row justify-center'>
					<Loader height={60} width={60} color={'4caf50'} />
				</div>
				<p>Loading ({ props.loaded }/6)</p>
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

Homepage.propTypes = { loaded: PropTypes.number };
