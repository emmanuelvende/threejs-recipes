import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

import { Shuttle } from './shuttle';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const orbitControls = new OrbitControls(camera, renderer.domElement);

function animate() {
    orbitControls.update();
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1);

const grid = new THREE.GridHelper(200, 10);
scene.add(grid);

const shuttle = new Shuttle();
shuttle.mesh.position.y = 2.5;
const axesHelperShuttle = new THREE.AxesHelper(3);
shuttle.mesh.add(axesHelperShuttle);

const geoGround = new THREE.PlaneGeometry(100, 100);
const matGround = new THREE.MeshPhongMaterial({color: 0x0080c0});
const ground = new THREE.Mesh(geoGround, matGround);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

function init() {
    camera.position.set(1, 5, 5);
    scene.add(hemisphereLight);
    scene.add(shuttle.mesh);
}

init();
window.addEventListener("resize", onWindowResize);
renderer.setAnimationLoop(animate);