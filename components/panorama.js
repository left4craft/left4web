import {
	Canvas, useThree, useFrame
} from '@react-three/fiber';
import {
	MathUtils, Texture, ImageLoader, MeshBasicMaterial, Mesh, BoxGeometry
} from 'three';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

let lon = 180;
let lat = -15;
let phi = 0;
let theta = 0;

// Loads the skybox texture and applies it to the scene.
function SkyBox(props) {
	const {
		gl, camera, scene
	} = useThree();

	useEffect(
		() => {
			const textures = getTexturesFromAtlasFile('/images/panorama.png', 6, props.setLoaded);

			const materials = [];
			for (let i = 0; i < 6; i++) {
				materials.push(new MeshBasicMaterial({ map: textures[i] }));
			}

			const skyBox = new Mesh(new BoxGeometry(1, 1, 1), materials);
			skyBox.geometry.scale(1, 1, - 1);
			scene.add(skyBox);

			camera.position.z = 0.01;

			window.addEventListener('scroll', listenToScroll);
			window.addEventListener('resize', onWindowResize);
			listenToScroll();
			onWindowResize();

			// clean up useEffect stuff on unmount
			return () => {
				scene.remove(skyBox);
				window.removeEventListener('scroll', listenToScroll);
				window.removeEventListener('resize', onWindowResize);
			};
		},
		[]
	);

	function getTexturesFromAtlasFile(atlasImgUrl, tilesNum, setLoaded) {
		const textures = [];

		for (let i = 0; i < tilesNum; i ++) {
			textures[i] = new Texture();
		}

		new ImageLoader()
			.load(atlasImgUrl, image => {

				let canvas, context;
				const tileWidth = image.height;

				for (let i = 0; i < textures.length; i ++) {
					canvas = document.createElement('canvas');
					context = canvas.getContext('2d');
					canvas.height = tileWidth;
					canvas.width = tileWidth;
					context.drawImage(image, tileWidth * i, 0, tileWidth, tileWidth, 0, 0, tileWidth, tileWidth);
					textures[i].image = canvas;
					textures[i].needsUpdate = true;
				}
				setLoaded(true);
			});
		return textures;
	}

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
	// use <Canvas linear> instead of <Canvas> to fix color mapping issues with react-three-fiber
	return <>
		<Canvas linear>
			<SkyBox loaded = {props.loaded} setLoaded={props.setLoaded} />
		</Canvas>
	</>;
}

Panorama.propTypes = {
	loaded: PropTypes.bool,
	setLoaded: PropTypes.func
};

SkyBox.propTypes = { setLoaded: PropTypes.func };
