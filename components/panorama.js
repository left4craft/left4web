// https://codeworkshop.dev/blog/2020-06-14-creating-a-skybox-with-reflections-in-react-three-fiber/

import {
	Canvas, useThree, useFrame
} from '@react-three/fiber';
import {
	CubeTextureLoader, LoadingManager, MathUtils
} from 'three';
import { useState } from 'react';
import PropTypes from 'prop-types';

let lon = 0;
let lat = -15;
let phi = 0;
let theta = 0;

// Loads the skybox texture and applies it to the scene.
function SkyBox(props) {
	const {
		gl, camera, scene
	} = useThree();

	const [mounted,
		setMounted] = useState(false);

	function listenToScroll() {
		const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
		const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

		let scrolled = winScroll / height;

		// edge case when there is no scroll bar
		if (isNaN(scrolled)) {
			scrolled = 0;
		}

		lat = -25 + 40*scrolled;
	}

	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	}

	if(!mounted){
		window.addEventListener('scroll', listenToScroll);
		window.addEventListener('resize', onWindowResize);
		listenToScroll();
		onWindowResize();
		setMounted(true);
	}

	const loadManager = new LoadingManager();
	const loader = new CubeTextureLoader(loadManager);
	// The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
	const texture = loader.load([
		'./images/panorama/1.png',
		'./images/panorama/3.png',
		'./images/panorama/4.png',
		'./images/panorama/5.png',
		'./images/panorama/0.png',
		'./images/panorama/2.png'
	]);
	// on texture load
	loadManager.onLoad = () => {
		props.setLoaded(6);
	},

	// eslint-disable-next-line no-unused-vars
	loadManager.onProgress = (url, itemsLoaded, itemsTotal) => {
		if (itemsLoaded > props.loaded) {
			// console.log(itemsLoaded);
			props.setLoaded(itemsLoaded);
		}
	};

	// Set the scene background property to the resulting texture.
	scene.background = texture;

	// eslint-disable-next-line no-unused-vars
	useFrame((state, delta) => {
		lon += 0.03;

		lat = Math.max(-85, Math.min(85, lat));
		phi = MathUtils.degToRad(90 - lat);
		theta = MathUtils.degToRad(lon);

		const x = 500 * Math.sin(phi) * Math.cos(theta);
		const y = 500 * Math.cos(phi);
		const z = 500 * Math.sin(phi) * Math.sin(theta);

		camera.lookAt(x, y, z);
		gl.render(scene, camera);

	});
	return null;
}

export function Panorama(props) {
	return <>
		<Canvas>
			<SkyBox loaded = {props.loaded} setLoaded={props.setLoaded} />
		</Canvas>
	</>;
}

Panorama.propTypes = {
	loaded: PropTypes.number,
	setLoaded: PropTypes.func
};
