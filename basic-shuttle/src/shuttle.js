import * as THREE from 'three';

export class Shuttle {

    mesh;
    mat;
    spotLights;
    target_object;

    constructor() {
        this.initMesh();
        this.initSpotlights();
    }

    initMesh() {
        this.mat = new THREE.MeshPhongMaterial(
            {
                color: 0xffffff,
                // wireframe: true
            }
        );
        const geoBody = new THREE.BoxGeometry(3, 0.25, 1.2);
        this.mesh = new THREE.Mesh(geoBody, this.mat);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

        const geoWings = new THREE.BoxGeometry(1.5, 0.1, 4);
        const meshWings = new THREE.Mesh(geoWings, this.mat);
        meshWings.position.copy(new THREE.Vector3(-1, 0.125, 0));
        meshWings.rotation.z = -Math.PI / 12;
        meshWings.castShadow = true;
        meshWings.receiveShadow = true;
        this.mesh.add(meshWings);

        const geoFrontSpoiler = new THREE.BoxGeometry(1, 0.1, 0.5);
        const meshFrontSpoiler = new THREE.Mesh(geoFrontSpoiler, this.mat);
        meshFrontSpoiler.position.copy(new THREE.Vector3(1.5, 0, 0));
        meshFrontSpoiler.castShadow = true;
        meshFrontSpoiler.receiveShadow = true;
        this.mesh.add(meshFrontSpoiler);

        const geoLeftSpoiler = new THREE.BoxGeometry(2, 0.25, 0.08);
        const meshLeftSpoiler = new THREE.Mesh(geoLeftSpoiler, this.mat);
        meshLeftSpoiler.position.x = -0.5;
        meshLeftSpoiler.position.y = 0.2;
        meshLeftSpoiler.position.z = -0.3;
        meshLeftSpoiler.rotation.z = -Math.PI / 18;
        meshLeftSpoiler.castShadow = true;
        meshLeftSpoiler.receiveShadow = true;
        this.mesh.add(meshLeftSpoiler);

        const meshRightSpoiler = meshLeftSpoiler.clone();
        meshRightSpoiler.position.z = 0.3;

        this.mesh.add(meshRightSpoiler);

    }

    initSpotlights() {
        this.spotLights = [];
        const leftSpotLight = new THREE.SpotLight(0xffffff, 50);

        leftSpotLight.castShadow = true;
        leftSpotLight.angle = Math.PI / 4;
        leftSpotLight.penumbra = 0.2;
        leftSpotLight.decay = 1;
        leftSpotLight.distance = 0;

        leftSpotLight.position.copy(this.mesh.position);
        this.target_object = new THREE.Object3D();
        this.target_object.position.copy(this.mesh.position);
        this.target_object.position.add(new THREE.Vector3(10, 0, 0));
        leftSpotLight.target = this.target_object;
        this.mesh.add(this.target_object, leftSpotLight);

        this.spotLights.push(leftSpotLight);
        const leftSpotLightHelper = new THREE.SpotLightHelper(leftSpotLight);
        this.mesh.add(leftSpotLightHelper);
    }
}