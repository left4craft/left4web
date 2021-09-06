// https://codeworkshop.dev/blog/2020-06-14-creating-a-skybox-with-reflections-in-react-three-fiber/

import React, { useRef } from 'react';
import {
	Canvas, extend, useThree, useFrame
} from '@react-three/fiber';
import { CubeTextureLoader, sRGBEncoding } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


extend({ OrbitControls });

const CameraControls = () => {
	// Get a reference to the Three.js Camera, and the canvas html element.
	// We need these to setup the OrbitControls class.
	// https://threejs.org/docs/#examples/en/controls/OrbitControls

	const {
		camera,
		gl: { domElement }
	} = useThree();

	domElement.outputEncoding = sRGBEncoding;
	domElement.gammaOutput = true;

	// Ref to the controls, so that we can update them on every frame using useFrame
	const controls = useRef();
	useFrame(() => controls.current.update());
	return (
		<orbitControls
			ref={controls}
			args={[camera,
				domElement]}
			autoRotate={true}
			enableZoom={false}
		/>
	);
};

// Loads the skybox texture and applies it to the scene.
function SkyBox() {
	const { gl, scene } = useThree();


	const loader = new CubeTextureLoader();
	// The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
	const texture = loader.load([
		'./images/panorama/1.png',
		'./images/panorama/3.png',
		'./images/panorama/4.png',
		'./images/panorama/5.png',
		'./images/panorama/0.png',
		'./images/panorama/2.png'
	]);
	// Set the scene background property to the resulting texture.
	scene.background = texture;
	return null;
}

export function Panorama() {
	return (
		<Canvas>
			<CameraControls />
			{/* <Sphere /> */}
			<SkyBox />
		</Canvas>
	);
}
