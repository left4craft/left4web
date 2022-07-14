import PropTypes from 'prop-types';

export function Hero({ title }) {
	return <>
		<div className="text-white text-center text-6xl bg-hero bg-center bg-cover h-40 sm:h-80 font-bold">
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