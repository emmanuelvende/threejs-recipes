import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';

export class VisualEngineManager {

    rootElement;
    stats;
    anims;
    scene;
    camera;
    renderer;
    controls;

    constructor(rootElement) {
        this.rootElement = rootElement;
        this.stats = undefined;
        this.anims = [];
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.rootElement.appendChild(this.renderer.domElement);

        window.addEventListener("resize", () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    toggleStats() {
        if (this.stats === undefined) {
            this.stats = new Stats();
            this.rootElement.appendChild(this.stats.dom);
        } else {
            this.stats.dom.remove();
            this.stats = undefined;
        }
    }


    renderAll() {
        this.renderer.render(this.scene, this.camera);
        if (this.stats !== undefined) {
            this.stats.update();
        }
    }
}


export class VisualAnim {

    visualObject;

    constructor(visualObject) {
        this.visualObject = visualObject;
    }

    animate() { }
}

