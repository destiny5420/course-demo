import * as THREE from 'three';
import * as dat from 'dat.gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default {
  name: 'vModelInThree',
  props: {},
  components: {},
  data: function() {
    return {
      container: null,
      loader: null,
      scene: null,
      camera: null,
      renderer: null,
      orbitControls: null,
      light: null,
      light_intensity: 0.85,
      light_pos: {
        x: 1,
        y: 1,
        z: 1,
      },
      modelLoadingComplete: false,
      model_path: 'models/threeModel.glb',
      model: null,
      model_pos: {
        x: 2,
        y: 0,
        z: 0,
      },
      datGUI: null,
    };
  },
  methods: {
    init: function() {
      console.log('*** init ***');
      const vm = this;

      // -- get container
      vm.container = vm.$refs.container;

      // -- create scene
      vm.scene = new THREE.Scene();

      // -- create camera
      const fov = 60; // Field of view;
      const aspect = vm.canvasWidth / vm.canvasHeight;
      const near = 0.1;
      const far = 1000;
      vm.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      vm.camera.position.set(-5, 5, 12);
      vm.camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));
      vm.scene.add(vm.camera);

      vm.renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer({ antialias: true }) : new THREE.CanvasRenderer();
      vm.renderer.setSize(vm.canvasWidth, vm.canvasHeight);
      vm.renderer.setPixelRatio(window.devicePixelRatio);
      vm.container.appendChild(vm.renderer.domElement);

      // -- create orbit controls
      vm.orbitControls = new OrbitControls(vm.camera, vm.renderer.domElement);

      // -- create main light
      vm.light = new THREE.DirectionalLight(0xffffff, vm.light_intensity);
      vm.light.position.set(vm.light_pos.x, vm.light_pos.y, vm.light_pos.z);
      vm.scene.add(vm.light);

      // -- create object
      vm.loader = new GLTFLoader();
      vm.loader.load(vm.model_path, vm.onLoaderFinish, undefined, vm.onLoaderError);
    },
    render: function() {
      const vm = this;
      requestAnimationFrame(vm.render);

      vm.onUpdateObject(vm);

      vm.renderer.render(vm.scene, vm.camera);
    },
    onLoaderFinish: function(gltf) {
      const vm = this;
      vm.modelLoadingComplete = true;
      console.log('GLTF / data: ', gltf);
      vm.model = gltf.scene;
      vm.model.position.set(vm.model_pos.x, vm.model_pos.y, vm.model_pos.z);
      vm.scene.add(vm.model);
    },
    onLoaderError: function(err) {
      console.error('Load model error / message: ', err);
    },
    onUpdateObject: function(vm) {
      if (vm.modelLoadingComplete === false) {
        return;
      }

      vm.model.position.set(vm.model_pos.x, vm.model_pos.y, vm.model_pos.z);
    },
    createHelper: function() {
      const vm = this;

      // --- create grid helper
      const size = 10;
      const divisions = 10;
      const gridHelper = new THREE.GridHelper(size, divisions);
      vm.scene.add(gridHelper);

      // --- crate dat GUI
      vm.datGUI = new dat.GUI();
      vm.datGUI
        .add(vm.model_pos, 'x')
        .min(-10)
        .max(10)
        .step(0.1);

      vm.datGUI
        .add(vm.model_pos, 'y')
        .min(-10)
        .max(10)
        .step(0.1);

      vm.datGUI
        .add(vm.model_pos, 'z')
        .min(-10)
        .max(10)
        .step(0.1);
    },
  },
  computed: {
    canvasWidth: {
      get: function() {
        return window.innerWidth - window.innerWidth * 0.15;
      },
    },
    canvasHeight: {
      get: function() {
        return window.innerHeight;
      },
    },
  },
  // life cycle
  beforeCreate: function() {},
  created: function() {},
  beforeMounted: function() {},
  mounted: function() {
    this.init();
    this.render();
    this.createHelper();
  },
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {},
  Destroy: function() {},
};
