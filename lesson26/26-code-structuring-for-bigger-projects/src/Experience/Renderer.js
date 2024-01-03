import * as THREE from "three";

import Experience from "./Experience";

export default class Renderer {
  constructor() {
    this.experience = new Experience();
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;

    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });

    //when copying from script.js we need to replace renderer by this.instance
    this.instance.toneMapping = THREE.CineonToneMapping;
    this.instance.toneMappingExposure = 1.75;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.setClearColor("#211d20");
    this.instance.setSize(this.sizes.width, this.sizes.height); //we need to update sizes to this.sizes
    this.instance.setPixelRatio(this.sizes.pixelRatio); //we don't need to do the calculation, as we did it in the sizes class
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height); //we need to update sizes to this.sizes
    this.instance.setPixelRatio(this.sizes.pixelRatio); //we don't need to do the calculation, as we did it in the sizes class
  }

  update() {
    this.instance.render(this.scene, this.camera.instance);
  }
}
