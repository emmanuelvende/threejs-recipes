import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera, renderer.domElement);
// const loader = new GLTFLoader();

// const ambientLight = new THREE.AmbientLight(0xffffff); // soft white light
// scene.add(ambientLight);

// const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x080820, 1);
// scene.add(hemisphereLight);

const directionalLightRed = new THREE.DirectionalLight(0xff0000);
directionalLightRed.position.set(5, 30, 5);
directionalLightRed.castShadow = true;
scene.add(directionalLightRed);
const helperDirectionalLightRedShadow = new THREE.CameraHelper(directionalLightRed.shadow.camera);
scene.add(helperDirectionalLightRedShadow);

const directionalLightGreen = new THREE.DirectionalLight(0x00ff00);
directionalLightGreen.position.set(5, 30, -5);
directionalLightGreen.castShadow = true;
scene.add(directionalLightGreen);
const helperDirectionalLightGreenShadow = new THREE.CameraHelper(directionalLightGreen.shadow.camera);
scene.add(helperDirectionalLightGreenShadow);

const spotLight = new THREE.SpotLight(0x00ff00);
spotLight.position.set(-5, 30, -5);
spotLight.castShadow = true;
scene.add(spotLight);
const helpSpotLightShadow = new THREE.CameraHelper(spotLight.shadow.camera);
scene.add(helpSpotLightShadow);

const pointLight = new THREE.PointLight(0x0000ff);
pointLight.position.set(-5, 30, 5);
pointLight.castShadow = true;
scene.add(pointLight);
const helperPointLightShadow = new THREE.CameraHelper(pointLight.shadow.camera);
scene.add(helperPointLightShadow);

const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.castShadow = true;
cube.position.set(0, 3, 0);
scene.add(cube);


const groundGeometry = new THREE.BoxGeometry(10, 0.2, 10);
const groundMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.receiveShadow = true;
scene.add(ground);


// camera.position.x = 0;
// camera.position.y = 2;
// camera.position.z = 5;
camera.position.set(0, 2, 10)

function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);