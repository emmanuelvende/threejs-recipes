import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.top = "0px";
document.body.appendChild(labelRenderer.domElement);

const stats = new Stats();
document.body.appendChild(stats.dom);

const controls = new OrbitControls(camera, labelRenderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
scene.add(ambientLight);


function makeLight(LightClassName, color, posVector, text) {
    const light = new LightClassName(color);
    light.position.copy(posVector);
    light.castShadow = true;
    scene.add(light);
    const lightShadowHelper = new THREE.CameraHelper(light.shadow.camera);
    scene.add(lightShadowHelper);

    const sphereGeometry = new THREE.SphereGeometry(0.5);
    const sphereMaterial = new THREE.MeshLambertMaterial({color: color});
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.copy(posVector);
    scene.add(sphere);

    const div = document.createElement("div");
    div.className = "label";
    div.textContent = text;
    div.style.backgroundColor = "transparent";

    const label = new CSS2DObject(div);
    sphere.add(label);
}

makeLight(THREE.DirectionalLight, 0xff0000, new THREE.Vector3(5, 20, 5), "Directional RED");
makeLight(THREE.DirectionalLight, 0x00ff00, new THREE.Vector3(5, 20, -5), "Directional GREEN");
makeLight(THREE.SpotLight, 0xffffff, new THREE.Vector3(-5, 20, -5), "Spot WHITE");
makeLight(THREE.PointLight, 0xffffff, new THREE.Vector3(-5, 20, 5), "Point WHITE");

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

camera.position.set(0, 2, 10)

function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
    stats.update();
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);
renderer.setAnimationLoop(animate);