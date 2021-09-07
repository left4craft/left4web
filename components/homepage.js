import PropTypes from 'prop-types';
import { useState } from 'react';
import { Loader } from './loader';

export function Homepage(props) {
	const [transitionComplete,
		setTransitionComplete] = useState(false);

	if(!props.loaded) {
		return <>
			<div className='fixed top-16 left-0 bg-light text-white w-screen h-screen'>
				<br />
				<br />
				<div className='flex flex-row justify-center'>
					<Loader height={60} width={60} color={'4caf50'} />
				</div>
				<p>mc.left4craft.org</p>
			</div>
		</>;
	} else if (props.loaded && !transitionComplete) {
		// display the same loading screen as above, but this time with the animate-fade attibute
		setTimeout(() => {
			scroll(0, -9999);
			setTransitionComplete(true);
		}, 1000);
		return <>
			<div className='fixed top-16 left-0 bg-light text-white w-100 w-screen h-screen animate-fade'>
				<br />
				<br />
				<div className='flex flex-row justify-center'>
					<Loader height={60} width={60} color={'4caf50'} />
				</div>
				<p>mc.left4craft.org</p>
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

Homepage.propTypes = { loaded: PropTypes.bool };
