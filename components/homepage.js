import PropTypes from 'prop-types';
import { useState } from 'react';
import { Loader } from './loader';

export function Homepage(props) {
	const [transitionComplete,
		setTransitionComplete] = useState(false);

	if(props.loaded < 6) {
		return <>
			<div className='fixed top-16 left-0 bg-light text-white w-screen h-screen'>
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
	} else if (props.loaded >= 6 && !transitionComplete) {
		// display the same loading screen as above, but this time with the animate-fade attibute
		setTimeout(() => {
			setTransitionComplete(true);
		}, 1000);
		return <>
			<div className='fixed top-16 left-0 bg-light text-white w-100 w-screen h-screen animate-fade'>
				<br />
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
		<div className='h-24 bg-dark text-white'>
			<p>Footer Text</p>
		</div>

	</>;
}

Homepage.propTypes = { loaded: PropTypes.number };
