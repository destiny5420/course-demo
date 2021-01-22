import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import shader from './shader';

function GLManager(data) {
  this.totalEntries = data.length;
  this.loadedEntries = 0;
  this.init(data);
}

GLManager.prototype.init = function(data) {
  const camera = new THREE.PerspectiveCamera(45.0, 1.0, 0.1, 10000.0);
  camera.position.z = 5;
  camera.fov = 75.0;
  const scene = new THREE.Scene();
  // camera.lookAt = scene.position;
  const renderer = new THREE.WebGLRenderer({
    alpha: false,
    antialias: true,
  });

  renderer.setSize(window.innerWidth - window.innerWidth * 0.15, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.domElement.setAttribute('style', ' position: absolute; left: 15%;');
  this.textures = [];
  this.factors = data.map(() => new THREE.Vector2(1, 1));
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

  // other
  const orbitControls = new OrbitControls(camera, renderer.domElement);

  const size = 10;
  const divisions = 10;
  const gridHelper = new THREE.GridHelper(size, divisions);
  this.scene.add(gridHelper);
};

GLManager.prototype.getViewSize = function() {
  // console.warn('this.camera.aspect: ', this.camera.aspect, ` / fov: ${this.camera.fov}`);
  const fovInRadians = (this.camera.fov * Math.PI) / 180;
  const viewSize = Math.abs(this.camera.position.z * Math.tan(fovInRadians / 2) * 2);

  return viewSize;
};

GLManager.prototype.getPlaneSize = function() {
  const viewSize = this.getViewSize();
  return {
    width: viewSize * 0.5,
    height: viewSize * 0.5,
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
  const { width, height } = this.getPlaneSize();
  const SEGMENTS = 60;
  const GEOMETRY = new THREE.PlaneBufferGeometry(width, height, SEGMENTS, SEGMENTS);

  const MATERIAL = new THREE.ShaderMaterial({
    uniforms: {
      u_direction: {
        type: 'f',
        value: 0.0,
      },
      u_time: {
        type: 'f',
        value: 0.0,
      },
      u_v2Resolution: {
        type: 'v',
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      u_tmp: {
        type: 'f',
        value: 0.0,
      },
    },
    vertexShader: shader.VERTEX,
    fragmentShader: shader.FRAGMENT,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(GEOMETRY, MATERIAL);
  this.scene.add(mesh);
  this.mesh = mesh;
};

GLManager.prototype.mount = function(container) {
  container.appendChild(this.renderer.domElement);
};

GLManager.prototype.updateStickEffect = function({ direction }) {
  this.mesh.material.uniforms.u_direction.value = direction;
};

GLManager.prototype.updateTmp = function(value) {
  this.mesh.material.uniforms.u_tmp.value = value;
};

GLManager.prototype.scheduleLoop = function() {
  if (!this.loopRaf) {
    this.loop();
  }
};

GLManager.prototype.cancelLoop = function() {
  cancelAnimationFrame(this.loopRaf);
  this.loopRaf = null;
};

GLManager.prototype.loop = function() {
  this.render();
  this.time += 1;
  this.mesh.material.uniforms.u_time.value = this.time;
  this.loopRaf = requestAnimationFrame(this.loop);
};

GLManager.prototype.render = function() {
  if (!this.initialRender) {
    this.initialRender = true;
  }
  this.renderer.render(this.scene, this.camera);
};

// eslint-disable-next-line import/prefer-default-export
export { GLManager };
