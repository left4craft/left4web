// visit this page at http://localhost:3000/onboarding/james

import { useState } from 'react';
import PropTpes from 'prop-types';

export default function Page() {
const [count,
	setCount] = useState(1);

    return <>
    <h1>Hello World</h1>
    <CounterButton count = {count} setCount = {setCount} />
	<CounterDisplay count = {count} />
    </>;
}

function CounterButton(props) {
	return <button onClick= { () => props.setCount(props.count + 1) }> Count; { props.count } </button>;
}

function CounterDisplay(props) {
	if (props.count  15 === 0) {
		return <p>FizzBuzz</p>
	} else if (props.count % 5 === 0) {
		return <p>Buzz</p>
	} else if (props.count % 3 === 0) {
		return <p>Fizz</p>
	} else {
		return count;
	}
}