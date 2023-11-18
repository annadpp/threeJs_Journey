import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

/**
 * Cursor -> movement of camera on cursor move
 */

//so it works the same in all screens
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / sizes.width - 0.5; //this makes screen to be 0-1 so it works the same in all screens
  cursor.y = -(e.clientY / sizes.height - 0.5); //negative to invert so it behaves correctly
});

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Scene
const scene = new THREE.Scene();

// Object
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);

// const aspectRatio = sizes.width / sizes.height; // to avoid deformation
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100
// );

// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 2;
camera.lookAt(mesh.position);
scene.add(camera);

//Controls -> remember to import OrbitControls -> moves on drag and drop
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true; // for it to work, on Camera controls.update()
// controls.target.y = 1; // changes default position
// controls.update();

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  //   mesh.rotation.y = elapsedTime;

  // Update camera
  //   camera.position.x = cursor.x * 10; //multiplies to give more amplitude
  //   camera.position.y = cursor.y * 10;

  //   camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3; //full revolution around cube (Math.PI for controlling full rotation) -> multiplies all to make it further from camera
  //   camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  //   camera.position.y = cursor.y * 5;
  //   camera.lookAt(mesh.position); //with this we center the object in the camera -> you can delete it and the camera behaviour will be different -> (new THREE.Vector3()) does the same

  controls.update(); //for dumping to work

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
