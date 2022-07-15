import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import {
	useEffect, useState
} from 'react';

export function Hero({ title }) {
	const [bg,
		setBg] = useState(null);

	const { pathname } = useRouter();

	useEffect(() => {
		setBg((Math.floor(Math.random()*3)+1).toString());
	}, [pathname]);

	return <>
		<div className='hidden bg-hero-1' />
		<div className='hidden bg-hero-2' />
		<div className='hidden bg-hero-3' />
		<div id={`${title}-hero`} className={`text-white text-center text-6xl bg-hero-${bg === null ? 'loading' : bg} bg-center bg-cover h-40 sm:h-80 font-bold`}>
			<div className="h-12 sm:h-32" />
			<h1>{title}</h1>
		</div>
	</>;
}

Hero.propTypes = { title: PropTypes.string };

{ /**
.green-filter:after {
	background: rgba(137, 201, 61, 0.64);
	background: linear-gradient(45deg, rgba(137, 201, 61, 0.85) 0%, rgba(76, 175, 80, 0.85) 100%);
	background: -moz-linear-gradient(135deg, rgba(137, 201, 61, 0.85) 0%, rgba(76, 175, 80, 0.85) 100%);
	background: -webkit-linear-gradient(135deg, rgba(137, 201, 61, 0.85) 0%, rgba(76, 175, 80, 0.85) 100%);
}

*/ }