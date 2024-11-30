import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const orbitControls = new OrbitControls(camera, renderer.domElement);

const stats = new Stats()
document.body.appendChild(stats.dom);

const gui = new GUI();

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

function initGui() {
    const guiFolder = gui.addFolder("my folder");
}

initGui();
renderer.setAnimationLoop(animate);



const geoBody = new THREE.BoxGeometry(5, 1, 3);
const matBody = new THREE.MeshPhongMaterial({ color: 0xffff80 });
const box = new THREE.Mesh(geoBody, matBody);
box.receiveShadow = true;
box.castShadow = true;
scene.add(box);

camera.position.set(5, 1, 0);
renderer.setAnimationLoop(animate);


function animate() {
    orbitControls.update();
    renderer.render(scene, camera);
    stats.update();
}