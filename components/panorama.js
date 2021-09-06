// https://codeworkshop.dev/blog/2020-06-14-creating-a-skybox-with-reflections-in-react-three-fiber/

import {
	Canvas, useThree, useFrame
} from '@react-three/fiber';
import {
	CubeTextureLoader, MathUtils
} from 'three';

let lon = 0;
let lat = -15;
let phi = 0;
let theta = 0;

// Loads the skybox texture and applies it to the scene.
function SkyBox() {
	const {
		gl, camera, scene
	} = useThree();

	// const [rotation, setRotation] = useState(0);

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

export function Panorama() {
	return (
		<Canvas>
			{/* <CameraControls /> */}
			{/* <Sphere /> */}
			<SkyBox />
		</Canvas>
	);
}
