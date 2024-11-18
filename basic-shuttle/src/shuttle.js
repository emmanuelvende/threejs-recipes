import * as THREE from 'three';

export class Shuttle {

    mesh;

    constructor() {
        this.initBody();
        this.initSpotlights();
    }

    initBody() {
        const mat = new THREE.MeshPhongMaterial(
            {
                color: 0xffffff,
                // wireframe: true
            }
        );
        const thickness = 0.25;
        const width = 2;
        const height = 3;
        const geoBody = new THREE.BoxGeometry(width, thickness, height);
        this.mesh = new THREE.Mesh(geoBody, mat);
    }

    initSpotlights() {

    }
}