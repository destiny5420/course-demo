import * as THREE from 'three';
import * as dat from 'dat.gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default {
  name: 'vCarThree',
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
      main_light: {
        obj: null,
        intensity: 50,
        pos: {
          x: 1,
          y: 1,
          z: 1,
        },
      },
      second_light: {
        obj: null,
        intensity: 0.25,
        pos: {
          x: -1,
          y: 1,
          z: -1,
        },
      },
      modelLoadingComplete: false,
      model_path: 'models/Datsun/scene.gltf',
      model: null,
      model_pos: {
        x: 0.0,
        y: 0.0,
        z: 0.0,
      },
      model_rot: {
        x: 270.0,
        y: 0.0,
        z: 0.0,
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
      vm.scene.background = new THREE.Color(0xdddddd);

      // -- create camera
      const fov = 40; // Field of view;
      const aspect = vm.canvasWidth / vm.canvasHeight;
      const near = 1;
      const far = 5000;
      vm.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      vm.camera.position.set(-18.5, 3.8, 17.5);
      vm.camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));
      vm.scene.add(vm.camera);

      vm.renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer({ antialias: true }) : new THREE.CanvasRenderer();
      vm.renderer.setSize(vm.canvasWidth, vm.canvasHeight);
      vm.renderer.setPixelRatio(window.devicePixelRatio);
      vm.container.appendChild(vm.renderer.domElement);

      // -- create orbit controls
      vm.orbitControls = new OrbitControls(vm.camera, vm.renderer.domElement);

      // -- create main light
      vm.main_light.obj = new THREE.AmbientLight(0x404040, vm.main_light.intensity);
      vm.scene.add(vm.main_light.obj);

      // -- create directional light
      vm.second_light.obj = new THREE.DirectionalLight();
      vm.second_light.obj.position.set(0.0, 10.0, 0.0);
      vm.second_light.obj.castShadow = true;
      vm.scene.add(vm.second_light.obj);

      const directionalLightHelper = new THREE.DirectionalLightHelper(vm.second_light.obj);
      vm.scene.add(directionalLightHelper);

      // -- create point light
      const pointLight = new THREE.PointLight('#cae2ff', 10);
      pointLight.position.set(0.0, 10.0, 10.0);
      vm.scene.add(pointLight);

      const pointLightHelper = new THREE.PointLightHelper(pointLight);
      vm.scene.add(pointLightHelper);

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
      vm.model = gltf.scene.children[0].children[0];
      vm.model.scale.set(0.01, 0.01, 0.01);
      vm.model.rotation.set(vm.model_rot.x * vm.angleUnit, vm.model_rot.y * vm.angleUnit, vm.model_rot.z * vm.angleUnit);
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
      vm.model.rotation.set(vm.model_rot.x * vm.angleUnit, vm.model_rot.y * vm.angleUnit, vm.model_rot.z * vm.angleUnit);
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
        .min(-50)
        .max(50)
        .step(0.1);

      vm.datGUI
        .add(vm.model_pos, 'y')
        .min(-50)
        .max(50)
        .step(0.1);

      vm.datGUI
        .add(vm.model_pos, 'z')
        .min(-10)
        .max(10)
        .step(0.1);

      vm.datGUI
        .add(vm.model_rot, 'x')
        .min(0)
        .max(360)
        .step(1);

      vm.datGUI
        .add(vm.model_rot, 'y')
        .min(0)
        .max(360)
        .step(1);

      vm.datGUI
        .add(vm.model_rot, 'z')
        .min(0)
        .max(360)
        .step(1);
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
    angleUnit: {
      get: function() {
        return Math.PI / 180;
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
  beforeDestroy: function() {
    const vm = this;
    console.warn('*** three wave beforeDestroy ***');
    vm.datGUI.destroy();
  },
  Destroy: function() {},
};
