import { Renderer } from 'pixi.js';
import * as THREE from 'three';

function GLManager(data) {
  this.totalEntries = data.length;
  this.loadedEntries = 0;
  this.init();
}

GLManager.prototype.init = function() {
  const camera = new THREE.PerspectiveCamera(45.0, 1.0, 0.1, 10000.0);
  camera.position.z = 5;
  const scene = new THREE.Scene();
  camera.lookAt = scene.position;
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.setSize(window.innerWidth - window.innerWidth * 0.15, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  this.render = this.render.bind(this);
  this.currentIndex = 0;
  this.nextIndex = 0;
  this.textureProgress = 0;
  this.camera = camera;
  this.scene = scene;
  this.renderer = renderer;
  this.initialRender = false;
  this.time = 0;
  this.loopRaf = null;
  this.loop = this.loop.bind(this);
  this.getPlaneSize();
};

GLManager.prototype.getViewSize = function() {
  const fovInRadians = (this.camera.fov * Math.PI) / 180;
  const viewSize = Math.abs(this.camera.position.z * Math.tan(fovInRadians / 2) * 2);

  return viewSize;
};

GLManager.prototype.getPlaneSize = function() {
  const viewSize = this.getViewSize();
  console.log(`viewSize: ${viewSize} / plane width: ${viewSize * 1.5} / height: ${viewSize}`);
};

GLManager.prototype.createPlan = function() {
  console.log('GLManager createPlan function');
  console.log(`createPlan / this.totalEntries: ${this.totalEntries}`);
  this.loop();
};
GLManager.prototype.mount = function() {};
GLManager.prototype.render = function() {};
GLManager.prototype.loop = function() {
  console.log('GLManager loop function');
  console.log(`loop / this.totalEntries: ${this.totalEntries}`);
};
// eslint-disable-next-line import/prefer-default-export
export { GLManager };
