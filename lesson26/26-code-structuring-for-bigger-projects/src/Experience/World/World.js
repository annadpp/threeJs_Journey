import * as THREE from "three";

import Experience from "../Experience";
import Environment from "./Environment";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    //Test mesh
    const testMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial()
    );
    this.scene.add(testMesh);

    //Wait for resources -> we can load the world when they are ready
    this.resources.on("ready", () => {
      //Setup -> we create environment map when the resources are ready
      this.environment = new Environment();
    });
  }
}
