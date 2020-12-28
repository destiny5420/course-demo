import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
import { VertexShader, FragmentShader } from './shader';

let container;
let camera;
let scene;
let renderer;
let uniforms;
let datGUI;
const cameraData = {
  z: 1,
};

function onWindowResize() {
  renderer.setSize(window.innerWidth - window.innerWidth * 0.15, window.innerHeight);
  uniforms.u_resolution.value.x = renderer.domElement.width;
  uniforms.u_resolution.value.y = renderer.domElement.height;
}

function render() {
  uniforms.u_time.value += 0.05;
  camera.position.z = cameraData.z;
  renderer.render(scene, camera);
}

function animate() {
  // console.log('*** [closure] [shader smile] animate ***');
  requestAnimationFrame(animate);
  render();
}

function init() {
  console.log('*** [closure] [shader smile] init ***');

  container = document.getElementById('shader-smile-main');

  datGUI = new dat.GUI();
  datGUI
    .add(cameraData, 'z')
    .min(1)
    .max(5)
    .step(0.5);

  camera = new THREE.Camera();
  camera.position.z = cameraData.z;

  scene = new THREE.Scene();

  const geometry = new THREE.PlaneBufferGeometry(2, 2);

  uniforms = {
    u_time: { type: 'f', value: 1.0 },
    u_resolution: { type: 'v2', value: new THREE.Vector2() },
  };

  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: VertexShader,
    fragmentShader: FragmentShader,
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);

  const paperOrbitControls = new OrbitControls(camera, renderer.domElement);

  container.appendChild(renderer.domElement);
  onWindowResize();
  window.addEventListener('resize', onWindowResize, false);

  const gridSize = 10;
  const divisions = 10;
  const gridHelper = new THREE.GridHelper(gridSize, divisions);

  scene.add(gridHelper);
}

export default {
  name: 'vShaderSmile',
  props: {},
  components: {},
  data: function() {
    return {
      shaderSmileData: null,
      orbitControls: null,
    };
  },
  methods: {},
  computed: {},
  // life cycle
  beforeCreate: function() {},
  created: function() {},
  beforeMounted: function() {},
  mounted: function() {
    init();
    animate();
  },
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {
    datGUI.destroy();
  },
  Destroy: function() {},
};
