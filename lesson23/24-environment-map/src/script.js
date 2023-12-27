import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader.js";
import { GroundProjectedSkybox } from "three/addons/objects/GroundProjectedSkybox.js";
/**
 * Loaders
 */
const gltfLoader = new GLTFLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader(); //for CUBE TEXTURE!!!
const rgbeLoader = new RGBELoader(); // for HDR files
const exrLoader = new EXRLoader(); //for EXR files
const textureLoader = new THREE.TextureLoader(); //for LDR files

/**
 * Base
 */
// Debug
const gui = new GUI();
const global = {};

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Update all materials
 */
const updateAllMaterials = () => {
  scene.traverse((child) => {
    //we just want to get the Meshes
    if (child.isMesh && child.material.isMeshStandardMaterial) {
      child.material.envMapIntensity = global.envMapIntensity; //increase envMap intensity in all Meshes
    }
  });
};

/**
 * Environment map
 */
scene.backgroundBlurriness = 0;
scene.backgroundIntensity = 1; //only affects the background, not the elements

gui.add(scene, "backgroundBlurriness").min(0).max(1).step(0.001);
gui.add(scene, "backgroundIntensity").min(0).max(10).step(0.001);

//Global intensity
global.envMapIntensity = 1;
gui
  .add(global, "envMapIntensity")
  .min(0)
  .max(10)
  .step(0.001)
  .onChange(updateAllMaterials); //this way we can tweak the intensity of all Meshes at once

//LDR cube texture -> CUBE TEXTURE!!!
// const environmentMap = cubeTextureLoader.load([
//   "/environmentMaps/0/px.png",
//   "/environmentMaps/0/nx.png",
//   "/environmentMaps/0/py.png",
//   "/environmentMaps/0/ny.png",
//   "/environmentMaps/0/pz.png",
//   "/environmentMaps/0/nz.png",
// ]);
// scene.environment = environmentMap; //apply envMap to all MeshStandardMaterial
// scene.background = environmentMap;

//HDR (RGBE) equirectangular
// rgbeLoader.load("/environmentMaps/0/2k.hdr", (environmentMap) => {
//   environmentMap.mapping = THREE.EquirectangularReflectionMapping;
//   scene.background = environmentMap;
//   scene.environment = environmentMap;
// });

//HDR (EXR) equirectangular
// exrLoader.load("/environmentMaps/nvidiaCanvas-4k.exr", (environmentMap) => {
//   environmentMap.mapping = THREE.EquirectangularReflectionMapping;
//   scene.background = environmentMap;
//   scene.environment = environmentMap;
// });

//LDR equirectangular
// const environmentMap = textureLoader.load(
//   "/environmentMaps/blockadesLabsSkybox/anime_art_style_japan_streets_with_cherry_blossom_.jpg"
// );
// environmentMap.mapping = THREE.EquirectangularReflectionMapping;
// environmentMap.colorSpace = THREE.SRGBColorSpace; //we need to change it so the color is intense

// scene.background = environmentMap;
// scene.environment = environmentMap;

//Ground projected skybox
// rgbeLoader.load("/environmentMaps/2/2k.hdr", (environmentMap) => {
//   environmentMap.mapping = THREE.EquirectangularReflectionMapping;
//   scene.environment = environmentMap;

//   //Skybox -> puts objects on the floor, not flying
//   const skybox = new GroundProjectedSkybox(environmentMap);
//   skybox.radius = 120;
//   skybox.height = 11;
//   skybox.scale.setScalar(50);
//   scene.add(skybox);

//   gui.add(skybox, "radius", 1, 200, 0.1);
//   gui.add(skybox, "radius", 1, 200, 0.1);
// });

/**
 * Real time environment map
 */
const environmentMap = textureLoader.load(
  "/environmentMaps/blockadesLabsSkybox/interior_views_cozy_wood_cabin_with_cauldron_and_p.jpg"
);
environmentMap.mapping = THREE.EquirectangularReflectionMapping;
environmentMap.colorSpace = THREE.SRGBColorSpace; //we need to change it so the color is intense

scene.background = environmentMap;

/**
 * Holy donut
 */
const holyDonut = new THREE.Mesh(
  new THREE.TorusGeometry(8, 0.5),
  new THREE.MeshBasicMaterial({ color: new THREE.Color(10, 4, 2) })
);
holyDonut.layers.enable(1); // so the holy donut is reflected, but not the whole scene -> we need to change cubeCamera first
holyDonut.position.y = 3.5;
scene.add(holyDonut);

//Cube render target
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
  type: THREE.HalfFloatType,
}); //resolution (reduce as much as possible for performance), options for render target

scene.environment = cubeRenderTarget.texture;

//Cube camera
const cubeCamera = new THREE.CubeCamera(0.1, 100, cubeRenderTarget);
cubeCamera.layers.set(1); // so the whole environment isn't reflecting

/**
 * Torus Knot
 */
const torusKnot = new THREE.Mesh(
  new THREE.TorusKnotGeometry(1, 0.4, 100, 16),
  new THREE.MeshStandardMaterial({
    roughness: 0,
    metalness: 1,
    color: 0xaaaaaa,
  })
);
// torusKnot.material.envMap = environmentMap; //apply envMap to a MeshStandardMaterial

torusKnot.position.x = -4;
torusKnot.position.y = 4;
scene.add(torusKnot);

/**
 * Models
 */
gltfLoader.load("/models/FlightHelmet/glTF/FlightHelmet.gltf", (gltf) => {
  gltf.scene.scale.set(10, 10, 10);
  scene.add(gltf.scene);

  updateAllMaterials();
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(4, 5, 4);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.y = 3.5;
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();
const tick = () => {
  // Time
  const elapsedTime = clock.getElapsedTime();

  //Realtime environment map
  if (holyDonut) {
    holyDonut.rotation.x = Math.sin(elapsedTime) * 2;

    cubeCamera.update(renderer, scene);
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
