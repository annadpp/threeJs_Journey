// import * as THREE from "three"; // we're not using it because we're not creating a geometry from scratch as in the case of the test mesh

import Experience from "../Experience";
import Environment from "./Environment";
import Floor from "./Floor";
import Fox from "./Fox";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // //Test mesh
    // const testMesh = new THREE.Mesh(
    //   new THREE.BoxGeometry(1, 1, 1),
    //   new THREE.MeshStandardMaterial()
    // );
    // this.scene.add(testMesh);

    //Wait for resources -> we can load the world when they are ready
    this.resources.on("ready", () => {
      //add before the environment map, because we're updating the environment map, and if we add it later the floor won't be updated
      this.floor = new Floor();
      this.fox = new Fox();

      //Setup -> we create environment map when the resources are ready
      this.environment = new Environment();
    });
  }

  update() {
    //Check if the fox has been loaded
    if (this.fox) {
      this.fox.update();
    }
  }
}
