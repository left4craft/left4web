// visit this page at http://localhost:3000/onboarding/trevor
import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Page() {
	const [count,
		setCount] = useState(1);

	return (
		<>
			<p>Hello World!</p>
			<FizzBuzz count={count} setCount={setCount} />
		</>
	);
}

function FizzBuzz(props) {
	const [FizzBuzz,
		setFizzBuzz] = useState(props.count);

	function onClick() {
		const count = props.count + 1;

		if (count % 15 === 0) {
			setFizzBuzz('FizzBuzz');
		} else if (count % 5 === 0) {
			setFizzBuzz('Buzz');
		} else if (count % 3 === 0) {
			setFizzBuzz('Fizz');
		} else {
			setFizzBuzz(count);
		}

		props.setCount(props.count + 1);
	}

	return (
		<>
			<button onClick={() => onClick()} >Count: {props.count}</button>
			<p>{FizzBuzz}</p>
		</>
	);
}

FizzBuzz.propTypes = {
	count: PropTypes.number.isRequired,
	setCount: PropTypes.func.isRequired
};
