import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.129.0-chk6X8RSBl37CcZQlxof/mode=imports,min/optimized/three.js';

let camera;
let renderer;
let scene;

let lon = 0;
let lat = -25;
let phi = 0;
let theta = 0;

// let mouse_down = false;
// let x = 0;
// let y = 0;


init();
animate();

function init() {

	const container = document.getElementById('panorama');

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth-15, window.innerHeight);
	container.appendChild(renderer.domElement);

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100);
	camera.position.z = 0.01;

	const textures = getTexturesFromAtlasFile('/images/panorama.png', 6);

	const materials = [];

	for (let i = 0; i < 6; i++) {
		materials.push(new THREE.MeshBasicMaterial({ map: textures[i] }));
	}

	const skyBox = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), materials);
	skyBox.geometry.scale(1, 1, -1);
	scene.add(skyBox);

	window.addEventListener('resize', onWindowResize);

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

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth-15, window.innerHeight);

}

function update() {

	/* if(!mouse_down) */ lon += 0.03;

	lat = Math.max(-85, Math.min(85, lat));
	phi = THREE.MathUtils.degToRad(90 - lat);
	theta = THREE.MathUtils.degToRad(lon);

	const x = 500 * Math.sin(phi) * Math.cos(theta);
	const y = 500 * Math.cos(phi);
	const z = 500 * Math.sin(phi) * Math.sin(theta);

	camera.lookAt(x, y, z);
	renderer.render(scene, camera);
}


function animate() {
	requestAnimationFrame(animate);
	update();
}


// document.getElementById('panorama').addEventListener('mousedown', e=> {
// 	mouse_down = true;
// 	x = e.offsetX;
// 	y = e.offsetY;
// });

// window.addEventListener('mousemove', e => {
// 	if (mouse_down === true) {
// 		const x_vel = e.offsetX-x;
// 		const y_vel = e.offsetY-y;

// 		lon -= x_vel*180 / window.screen.width;
// 		lat += y_vel*180 / window.screen.height;

// 		x = e.offsetX;
// 		y = e.offsetY;

// 	}
// });

// window.addEventListener('mouseup', () => {
// 	if (mouse_down === true) {
// 		x = 0;
// 		y = 0;
// 		mouse_down = false;
// 	}
// });
