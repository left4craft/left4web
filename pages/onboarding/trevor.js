// visit this page at http://localhost:3000/onboarding/trevor

import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Page() {
	const [countState,
		setCountState] = useState(1);

	return <>
		<style jsx global>{`
        	body {
				background-color: #333;
        	}
      	`}</style>
		<div className="w-screen h-60 bg-primary" />
		<div className="bg-dark text-white flex justify-center">
			<div className="w-60 h-10 text-center">
				<p>Hello World!</p>
			</div>
			<div className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-60 h-10">
				<CounterButton count = { countState }  setCount = { setCountState } />
			</div>
			<div className="w-60 h-10 text-center">
				<CounterDisplay count = { countState } />
			</div>
		</div>

	</>;
}

function CounterButton(props) {
	return <button onClick={ () => props.setCount(props.count + 1) } >Click me!</button>;
}

function CounterDisplay(props) {
	if(props.count % 15 === 0) {
		return <p>FizzBuzz</p>;
	} else if (props.count % 5 === 0) {
		return <p>Buzz</p>;
	} else if (props.count % 3 === 0) {
		return <p>Fizz</p>;
	} else {
		return <p>{props.count}</p>;
	}
}

CounterButton.propTypes = {
	count: PropTypes.number,
	setCount: PropTypes.func
};

CounterDisplay.propTypes = { count: PropTypes.number };
