import * as THREE from 'three';
import { VisualEngineManager, VisualAnim } from "./core";

const vem = new VisualEngineManager(document.body);
vem.init();

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
vem.scene.add(hemisphereLight);

const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xc080f0 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(0, 3, 0);
vem.scene.add(cube);


const visualCube = new VisualAnim(cube);
visualCube.animate = function () {
    this.visualObject.rotation.x += 0.01;
    this.visualObject.rotation.y += 0.015;
}
vem.anims.push(visualCube);

vem.camera.position.set(0, 2, 10)


const folder = vem.gui.addFolder("Hello world");
// folder.add(data, "width", 1, 5).onChange( () => {
//     console.log(cube.children);
// } );


vem.renderer.setAnimationLoop(() => {
    vem.anims.forEach((anim) => {
        anim.animate();
    });
    vem.renderAll();
});


window.addEventListener("keypress", (ev) => {
    if (["f", "F"].includes(ev.key)) { vem.toggleStats(); }
});

