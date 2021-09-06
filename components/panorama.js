// https://codeworkshop.dev/blog/2020-06-14-creating-a-skybox-with-reflections-in-react-three-fiber/

import React, { useRef } from 'react';
import {
	Canvas, extend, useThree, useFrame
} from '@react-three/fiber';
import { CubeTextureLoader } from 'three';
import * as THREE from 'three';

// Loads the skybox texture and applies it to the scene.
function SkyBox() {
	let {
		gl, // WebGL renderer
		scene, // Default scene
		camera, // Default camera
		raycaster, // Default raycaster
		size, // Bounds of the view (which stretches 100% and auto-adjusts)
		viewport, // Bounds of the viewport in 3d units + factor (size/viewport)
		aspect, // Aspect ratio (size.width / size.height)
		mouse, // Current, centered, normalized 2D mouse coordinates
		clock, // THREE.Clock (useful for useFrame deltas)
		invalidate, // Invalidates a single frame (for <Canvas invalidateFrameloop />)
		intersect, // Calls onMouseMove handlers for objects underneath the cursor
		setDefaultCamera // Sets the default camera
	  } = useThree();
	//   	const loader = new CubeTextureLoader();
	// // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
	// const texture = loader.load([
	// 	'./images/panorama/1.png',
	// 	'./images/panorama/3.png',
	// 	'./images/panorama/4.png',
	// 	'./images/panorama/5.png',
	// 	'./images/panorama/0.png',
	// 	'./images/panorama/2.png'
	// ]);
	camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100);
	camera.aspect = window.innerWidth / window.innerHeight;

	// Set the scene background property to the resulting texture.
	// scene.background = texture;
	camera.position.z = 0.01;

	const textures = getTexturesFromAtlasFile('/images/panorama.png', 6);

	const materials = [];

	for (let i = 0; i < 6; i++) {
		materials.push(new THREE.MeshBasicMaterial({ map: textures[i] }));
	}

	const skyBox = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), materials);
	skyBox.geometry.scale(1, 1, -1);
	scene.add(skyBox);

	return null;
}

export function Panorama() {
	return (
		<Canvas>
			{/* <CameraControls /> */}
			{/* <Sphere /> */}
			<SkyBox />
		</Canvas>
	);
}


function getTexturesFromAtlasFile(atlasImgUrl, tilesNum) {
	const textures = [];

	for (let i = 0; i < tilesNum; i++) {
		textures[i] = new THREE.Texture();
	}

	const imageObj = new Image();
	imageObj.onload = function () {
		let canvas, context;
		const tileWidth = imageObj.height;

		for (let i = 0; i < textures.length; i++) {
			canvas = document.createElement('canvas');
			context = canvas.getContext('2d');
			canvas.height = tileWidth;
			canvas.width = tileWidth;
			context.drawImage(imageObj, tileWidth * i, 0, tileWidth, tileWidth, 0, 0, tileWidth, tileWidth);
			textures[i].image = canvas;
			textures[i].needsUpdate = true;
		}

	};

	imageObj.src = atlasImgUrl;

	return textures;

}

