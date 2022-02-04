import React, {
	useRef, useState, useEffect
} from 'react';
import PropTypes from 'prop-types';
import {
	Canvas, useFrame
} from '@react-three/fiber';
import {
	TextureLoader, MeshBasicMaterial, NearestFilter
} from 'three';

function Box(props) {

	// This reference will give us direct access to the mesh
	const mesh = useRef();

	useEffect(
		() => {
			const loader = new TextureLoader();
			loader.setPath('/images/heads/captain_sisko/');

			const materials = [];
			for(const texture of ['px.png',
				'nx.png',
				'py.png',
				'ny.png',
				'pz.png',
				'nz.png']) {

				const textureMap = loader.load(texture);

				// pixelated scaling to prevent blurry faces
				textureMap.magFilter = NearestFilter;

				materials.push(new MeshBasicMaterial({ map: textureMap }));
			}
			mesh.current.material = materials;
		},
		[]
	);

	// Subscribe this component to the render-loop, rotate the mesh every frame
	useFrame(
		() => {
			mesh.current.rotation.y = props.rotation.x;
			mesh.current.rotation.x = props.rotation.y;
		}
	);
	// Return view, these are regular three.js elements expressed in JSX
	return (
		<mesh
			ref={mesh}
			scale={1}>
			{/* onClick={event => setActive(!active)}
			onPointerOver={event => setHover(true)}
			onPointerOut={event => setHover(false)}> */}
			<boxGeometry args={[1,
				1,
				1]} />
			<meshStandardMaterial color='black' />
		</mesh>
	);
}

Box.propTypes = { rotation: PropTypes.object };

export function PlayerHead(props) {
	// store the HTML element to be able to extract its position
	const [headElem,
		setHeadElem] = useState(null);

	const [rotation,
		setRotation] = useState({
		x: 0,
		y: 0
	});

	// whenever mouse position or scroll changes, update direction
	// the head is facing
	useEffect(
		() => {

			if(headElem !== null) {
				const bound = headElem.getBoundingClientRect();
				const headX = (bound.left + bound.right) / 2;
				const headY = (bound.top + bound.bottom) / 2;

				let xRot = 2*(props.mousePos.x - headX) / document.body.clientWidth;
				let yRot = 2*(props.mousePos.y - props.scroll - headY) / window.innerHeight;

				// make sure head isn't rotated too far
				if (Math.abs(xRot) > 0.6) {
					xRot = Math.sign(xRot) * 0.6;
				}
				if (Math.abs(yRot) > 0.6) {
					yRot = Math.sign(yRot) * 0.6;
				}

				// console.log((props.mousePos.x - headX) / document.body.clientWidth);
				// console.log((props.mousePos.y - props.scroll - headY) / window.innerHeight);
				setRotation({
					x: xRot,
					y: yRot
				});
			}
		},
		[props.mousePos,
			props.scroll]
	);

	return (
		<div ref={el => {
			if(el === null || headElem === el) return;
			setHeadElem(el);
		}
		}>
			<Canvas linear>
				<ambientLight />
				<pointLight position={[10,
					10,
					10]} />
				{/* <ambientLight />
				<pointLight position={[10,
					10,
					10]} />
				<Box position={[-1.2,
					0,
					0]} /> */}
				<Box position={[0,
					0,
					0]} rotation={rotation} />
			</Canvas>

		</div>
	);
}

PlayerHead.propTypes = {
	mousePos: PropTypes.object,
	scroll: PropTypes.number
};
