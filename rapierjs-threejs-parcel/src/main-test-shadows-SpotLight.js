import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'


const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);

const gui = new GUI();

const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
const controls = new OrbitControls(camera, renderer.domElement);
const scene = new THREE.Scene();

const matGround = new THREE.MeshPhongMaterial({ color: 0xc0c0c0 });
const geoGround = new THREE.PlaneGeometry(50, 50);
const mshGround = new THREE.Mesh(geoGround, matGround);
mshGround.rotation.x = - Math.PI * 0.5;

const matBox = new THREE.MeshPhongMaterial({ color: 0xc0a080 });
const geoBox = new THREE.BoxGeometry(0.5, 0.4, 0.3);
const mshBox = new THREE.Mesh(geoBox, matBox);


const ambient = new THREE.AmbientLight(0x808080);
const spotLight = createSpotLight(0xffffff);
const lightHelper = new THREE.SpotLightHelper(spotLight);

function init() {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    camera.position.set(4.6, 2.2, -2.1);

    scene.add(ambient);
    scene.add(mshGround);
    scene.add(mshBox);
    scene.add(spotLight, lightHelper);

    document.body.appendChild(renderer.domElement);
    window.addEventListener("resize", onWindowResize);

    mshGround.receiveShadow = true;
    mshGround.position.set(0, -0.1, 0);

    mshBox.castShadow = true;
    mshBox.receiveShadow = true;
    mshBox.position.set(0, 0.5, 0);

    controls.target.set(0, 0.5, 0);
    controls.maxPolarAngle = Math.PI / 2;
    controls.minDistance = 1;
    controls.maxDistance = 50;
    controls.update();
}



function initGui() {
    const guiBoxPos = gui.addFolder("box position");
    guiBoxPos.add(mshBox.position, "x", -5, 5, 0.1);
    guiBoxPos.add(mshBox.position, "y", 0, 5, 0.1);
    guiBoxPos.add(mshBox.position, "z", -5, 5, 0.1);

    const guiSpotLight = gui.addFolder("light");
    [
        { property: "angle", min: 0, max: Math.PI / 2, step: 0.01 },
        { property: "penumbra", min: 0, max: 1, step: 0.01 },
        { property: "decay", min: 0, max: 50, step: 0.5 },
        { property: "distance", min: 0, max: 50, step: 0.5 }
    ].forEach(
        x => guiSpotLight.add(spotLight, x.property, x.min, x.max, x.step)
    );

    [
        { property: "x", min: 0, max: 50, step: 0.1 },
        { property: "y", min: 0, max: 50, step: 0.1 },
        { property: "z", min: 0, max: 50, step: 0.1 },
    ].forEach(
        x => guiSpotLight.add(spotLight.position, x.property, x.min, x.max, x.step)
    );
}

function createSpotLight(color) {
    const light = new THREE.SpotLight(color, 10);
    light.castShadow = true;
    light.angle = Math.PI / 4;
    light.penumbra = 0.2;
    light.decay = 2;
    light.distance = 50;
    return light;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    renderer.render(scene, camera);
    mshBox.rotation.x += 0.004;
    mshBox.rotation.y += 0.006;

    lightHelper.update();
}


init();
initGui();