import * as THREE from 'three';
import shader from './shader';

function GLManager(data) {
  this.totalEntries = data.length;
  this.loadedEntries = 0;
  this.init(data);
}

GLManager.prototype.init = function(data) {
  const camera = new THREE.PerspectiveCamera(45.0, 1.0, 0.1, 10000.0);
  camera.position.z = 5;
  camera.fov = 50;
  const scene = new THREE.Scene();
  camera.lookAt = scene.position;
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
  const { width, height } = this.getPlaneSize();
  const SEGMENTS = 60;
  const GEOMETRY = new THREE.PlaneBufferGeometry(width, height, SEGMENTS, SEGMENTS);

  const MATERIAL = new THREE.ShaderMaterial({
    uniforms: {
      u_texture: {
        type: 't',
        value: this.textures[this.currentIndex],
      },
      u_textureFactor: {
        type: 'f',
        value: this.factors[this.currentIndex],
      },
      u_texture2: {
        type: 't',
        value: this.textures[this.nextIndex],
      },
      u_texture2Factor: {
        type: 'f',
        value: this.factors[this.nextIndex],
      },
      u_textureProgress: {
        type: 'f',
        value: this.textureProgress,
      },
      u_offset: {
        type: 'f',
        value: 8,
      },
      u_progress: {
        type: 'f',
        value: 0,
      },
      u_direction: {
        type: 'f',
        value: 1,
      },
    },
    vertexShader: shader.VERTEX,
    fragmentShader: shader.FRAGMENT,
    side: THREE.DoubleSide,
  });
  const MESH = new THREE.Mesh(GEOMETRY, MATERIAL);
  this.scene.add(MESH);
  this.mesh = MESH;
  // this.loop();
};

GLManager.prototype.mount = function(container) {
  container.appendChild(this.renderer.domElement);
};

GLManager.prototype.updateStickEffect = function({ progress }) {
  this.mesh.material.uniforms.u_progress.value = progress;
};

GLManager.prototype.render = function() {
  if (!this.initialRender) {
    this.initialRender = true;
  }
  this.renderer.render(this.scene, this.camera);
  // this.renderer.render(this.scene, this.camera);
};
GLManager.prototype.loop = function() {};
// eslint-disable-next-line import/prefer-default-export
export { GLManager };
