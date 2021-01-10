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
  camera.fov = 50;
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
  console.warn('this.camera.aspect: ', this.camera.aspect, ` / fov: ${this.camera.fov}`);
  const fovInRadians = (this.camera.fov * Math.PI) / 180;
  const viewSize = Math.abs(this.camera.position.z * Math.tan(fovInRadians / 2) * 2);

  return viewSize;
};

GLManager.prototype.getPlaneSize = function() {
  const viewSize = this.getViewSize();
  return {
    width: viewSize * 1.5,
    height: viewSize,
  };
};

GLManager.prototype.calculateAspectRatioFactor = function(index, texture) {
  const plan = this.getPlaneSize();
  const windowRatio = window.innerWidth / window.innerHeight;
  const rectRatio = (plan.width / plan.height) * windowRatio;
  const imageRatio = texture.image.width / texture.image.height;

  let factorX = 1;
  let factorY = 1;
  if (rectRatio > imageRatio) {
    factorX = 1;
    factorY = (1 / rectRatio) * imageRatio;
  } else {
    factorX = (1 / rectRatio) * imageRatio;
    factorY = 1;
  }

  this.factors[index] = new THREE.Vector2(factorX, factorY);
  if (this.currentIndex === index) {
    this.mesh.material.uniforms.u_textureFactor.value = this.factors[index];
    this.mesh.material.uniforms.u_textureFactor.needUpdate = true;
  }

  if (this.nextIndex === index) {
    this.mesh.material.uniforms.u_texture2Factor.value = this.factors[index];
    this.mesh.material.uniforms.u_texture2Factor.needUpdate = true;
  }

  if (this.initialRender) {
    this.loadedEntries += 1;
    if (this.loadedEntries === this.totalEntries) {
      document.body.classList.remove('loading');
    }
    this.render();
  }
};

GLManager.prototype.createPlan = function() {
  this.loop();
};
GLManager.prototype.mount = function() {};
GLManager.prototype.render = function() {
  if (!this.initialRender) {
    this.initialRender = true;
  }

  this.renderer.render(this.scene, this.camera);
};
GLManager.prototype.loop = function() {};
// eslint-disable-next-line import/prefer-default-export
export { GLManager };
