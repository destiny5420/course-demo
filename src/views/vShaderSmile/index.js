import * as THREE from 'three';

let container;
let camera;
let scene;
let renderer;
let uniforms;

function onWindowResize() {
  renderer.setSize(window.innerWidth - window.innerWidth * 0.15, window.innerHeight);
  uniforms.u_resolution.value.x = renderer.domElement.width;
  uniforms.u_resolution.value.y = renderer.domElement.height;
}

function render() {
  uniforms.u_time.value += 0.05;
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

  camera = new THREE.Camera();
  camera.position.z = 1;

  scene = new THREE.Scene();

  const geometry = new THREE.PlaneBufferGeometry(2, 2);

  uniforms = {
    u_time: { type: 'f', value: 1.0 },
    u_resolution: { type: 'v2', value: new THREE.Vector2() },
  };

  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: document.getElementById('vertexshader').textContent,
    fragmentShader: document.getElementById('fragmentshader').textContent,
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);
  onWindowResize();
  window.addEventListener('resize', onWindowResize, false);
}

export default {
  name: 'vShaderSmile',
  props: {},
  components: {},
  data: function() {
    return {
      shaderSmileData: null,
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
  beforeDestroy: function() {},
  Destroy: function() {},
};
