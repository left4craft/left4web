/* eslint-disable no-unused-vars */
import React, {
	useRef, useState
} from 'react';
import {
	Canvas, useFrame
} from '@react-three/fiber';

export function Panorama () {
	return <>
		<Canvas>
			<ambientLight />
			<pointLight position={[10,
				10,
				10]} />
			<Box position={[-1.2,
				0,
				0]} />
			<Box position={[1.2,
				0,
				0]} />
		</Canvas>,

	</>;
}
function Box(props) {
	// This reference will give us direct access to the mesh
	const mesh = useRef();
	// Set up state for the hovered and active state
	const [hovered,
		setHover] = useState(false);
	const [active,
		setActive] = useState(false);
	// Subscribe this component to the render-loop, rotate the mesh every frame
	useFrame((_state, _delta) => (mesh.current.rotation.y += 0.01));
	// Return view, these are regular three.js elements expressed in JSX
	return (
		<mesh
			{...props}
			ref={mesh}
			scale={active ? 1.5 : 1}
			onClick={_event => setActive(!active)}
			onPointerOver={_event => setHover(true)}
			onPointerOut={_event => setHover(false)}>
			<boxGeometry args={[1,
				1,
				1]} />
			<meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
		</mesh>
	);
}


