import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import * as dat from 'dat.gui';
// import { TransformControls } from 'three/examples/jsm/controls/TransformControls';

export default {
  name: 'vThreeWave',
  props: {},
  components: {},
  data: function() {
    return {
      three: {
        container: null,
        scene: null,
        camera: null,
        renderer: null,
        orbitControls: null,
        stats: null,
      },
      objs: {
        cube: null,
      },
      configure: {
        startupPos: {
          x: 25,
          y: 15,
          z: 35,
        },
        fov: 75.0,
        amountX: 50,
        amountY: 50,
        positions: [],
        scales: [],
        SEPARATION: 10,
        positionOffset: 10,
        scaleOffset: 3.5,
      },
      particles: [],
      particleCount: 0,
      datGUI: null,
    };
  },
  methods: {
    init: function() {
      console.log('-- Initialize Function --');
      const vm = this;

      vm.three.container = document.getElementById('canvas-render');
      vm.three.stats = new Stats();
      vm.three.container.appendChild(vm.three.stats.dom);

      // vm.createDatGUI();
      vm.createScene();
      vm.createObj();
      vm.createLight();
      vm.createHelper();
      vm.animate();
      vm.renderScene();
    },
    createDatGUI: function() {
      const vm = this;
      vm.datGUI = new dat.GUI();
      vm.datGUI
        .add(vm.configure, 'positionOffset')
        .min(2)
        .max(10)
        .step(0.5);
      vm.datGUI
        .add(vm.configure, 'scaleOffset')
        .min(1)
        .max(4)
        .step(0.5);
    },
    createScene: function() {
      console.log('-- createScene Function --');
      const vm = this;

      // -- create scene
      vm.three.scene = new THREE.Scene();

      // -- create camera
      vm.three.camera = new THREE.PerspectiveCamera(75, (window.innerWidth - window.innerWidth * 0.15) / window.innerHeight, 0.1, 1000);
      vm.three.camera.position.set(vm.configure.startupPos.x, vm.configure.startupPos.y, vm.configure.startupPos.z);

      vm.three.renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer({ antialias: true, alpha: true }) : new THREE.CanvasRenderer();
      vm.three.renderer.setSize(window.innerWidth - window.innerWidth * 0.15, window.innerHeight);
      vm.three.renderer.setClearColor('#2e2e2e', 1); // setting background color;

      vm.three.container.appendChild(vm.three.renderer.domElement);

      // -- OrbitControls
      vm.three.orbitControls = new OrbitControls(vm.three.camera, vm.three.renderer.domElement);
      vm.three.orbitControls.autoRotate = true;
      vm.three.orbitControls.enableDamping = true;

      const numParticles = vm.configure.amountX * vm.configure.amountY;
      vm.configure.positions = new Float32Array(numParticles * 3);
      vm.configure.scales = new Float32Array(numParticles);

      const colors = new Float32Array(numParticles * 4);

      let i = 0;
      let j = 0;
      let k = 0;

      for (let ix = 0; ix < vm.configure.amountX; ix += 1) {
        for (let iy = 0; iy < vm.configure.amountY; iy += 1) {
          vm.configure.positions[i] = ix * vm.configure.SEPARATION - (vm.configure.amountX * vm.configure.SEPARATION) / 2; // x
          vm.configure.positions[i + 1] = 0; // y
          vm.configure.positions[i + 2] = iy * vm.configure.SEPARATION - (vm.configure.amountY * vm.configure.SEPARATION) / 2; // z
          vm.configure.scales[j] = 0.5;

          colors[k] = Math.random();
          colors[k + 1] = Math.random();
          colors[k + 2] = Math.random();
          colors[k + 3] = 1;

          i += 3;
          j += 1;
          k += 4;
        }
      }

      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(vm.configure.positions, 3));
      particleGeometry.setAttribute('scale', new THREE.BufferAttribute(vm.configure.scales, 1));
      particleGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 4));

      const particleMaterial = new THREE.ShaderMaterial({
        uniforms: {
          // color: { value: new THREE.Color(0xffffff) },
        },
        vertexShader: document.getElementById('vertexshader').textContent,
        fragmentShader: document.getElementById('fragmentshader').textContent,
      });

      vm.particles = new THREE.Points(particleGeometry, particleMaterial);
      vm.three.scene.add(vm.particles);
    },
    createObj: function() {
      console.log('-- createObj Function --');
      const vm = this;

      // const geometry = new THREE.BoxGeometry();
      // const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
      // vm.objs.cube = new THREE.Mesh(geometry, material);
      // vm.three.scene.add(vm.objs.cube);

      // vm.three.camera.position.z = 5;
    },
    createLight: function() {
      const vm = this;
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      vm.three.scene.add(directionalLight);
    },
    createHelper: function() {
      const vm = this;

      // const size = 10;
      // const divisions = 10;
      // const gridHelper = new THREE.GridHelper(size, divisions);
      // vm.three.scene.add(gridHelper);
    },
    animate: function() {
      const vm = this;
      requestAnimationFrame(vm.animate); // 產生動畫
      vm.renderScene();
      vm.three.stats.update();
    },
    renderScene: function() {
      const vm = this;

      vm.updateParticle();
      // if (vm.particleCount % 3 === 0) {
      //   vm.
      // }
      vm.three.orbitControls.update();
      vm.three.renderer.render(vm.three.scene, vm.three.camera);
    },
    updateParticle: function() {
      const vm = this;
      let i = 0;
      let j = 0;

      const positions = vm.particles.geometry.attributes.position.array;
      const scales = vm.particles.geometry.attributes.scale.array;

      for (let ix = 0; ix < vm.configure.amountX; ix += 1) {
        for (let iy = 0; iy < vm.configure.amountY; iy += 1) {
          positions[i + 1] = Math.sin((ix + vm.particleCount) * 0.3) * vm.configure.positionOffset + Math.sin((iy + vm.particleCount) * 0.5) * vm.configure.positionOffset;
          scales[j] = (Math.sin((ix + vm.particleCount) * 0.3) + 1) * vm.configure.scaleOffset + (Math.sin((ix + vm.particleCount) * 0.5) + 1) * vm.configure.scaleOffset;
          i += 3;
          j += 1;
        }
      }

      vm.particles.geometry.attributes.position.needsUpdate = true;
      vm.particles.geometry.attributes.scale.needsUpdate = true;

      vm.particleCount += 0.1;
    },
    updateColor: function() {
      const vm = this;

      const colors = vm.particles.geometry.attributes.color.array;
      const count = vm.configure.amountX * vm.configure.amountY;
      let tmpValue = 0;
      for (let i = 0; i < count; i += 1) {
        colors[tmpValue] = Math.random();
        colors[tmpValue + 1] = Math.random();
        colors[tmpValue + 2] = Math.random();
        colors[tmpValue + 3] = 1;

        tmpValue += 4;
      }

      vm.particles.geometry.attributes.color.needsUpdate = true;
    },
  },
  computed: {},
  // life cycle
  beforeCreate: function() {},
  created: function() {
    console.warn('*** three wave created ***');
  },
  beforeMounted: function() {},
  mounted: function() {
    console.warn('*** three wave mounted ***');
    const vm = this;

    vm.init();
  },
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {
    const vm = this;
    console.warn('*** three wave beforeDestroy ***');
    vm.datGUI.destroy();
  },
  Destroy: function() {},
};
