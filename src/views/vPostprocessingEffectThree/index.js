import * as THREE from 'three';
import * as dat from 'dat.gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as POSTPROCESSING from 'postprocessing';

export default {
  name: 'vPostprocessingEffectThree',
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
      transformControls: null,
      composer: null,
      bloomEffect: null,
      postprocessing: {
        blurIntensity: 3,
      },
      main_light: {
        obj: null,
        intensity: 0.85,
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
      model_path: 'models/DrakeFireGun/scene.gltf',
      model: null,
      model_pos: {
        x: 0,
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
      vm.scene.background = new THREE.Color(0xdddddd);

      // -- create camera
      const fov = 45; // Field of view;
      const aspect = vm.canvasWidth / vm.canvasHeight;
      const near = 0.1;
      const far = 1000;
      vm.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      vm.camera.position.set(-2.217, 1.566, 0.55);
      vm.camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));
      vm.scene.add(vm.camera);

      const cameraHelper = new THREE.CameraHelper(vm.camera);
      vm.scene.add(cameraHelper);

      vm.renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer({ antialias: true }) : new THREE.CanvasRenderer();
      vm.renderer.setSize(vm.canvasWidth, vm.canvasHeight);
      vm.renderer.setPixelRatio(window.devicePixelRatio);
      vm.container.appendChild(vm.renderer.domElement);

      // -- create orbit controls
      vm.orbitControls = new OrbitControls(vm.camera, vm.renderer.domElement);
      vm.orbitControls.autoRotate = true;
      vm.orbitControls.enableDamping = true;

      // -- create postprocessing
      vm.composer = new POSTPROCESSING.EffectComposer(vm.renderer);
      vm.composer.addPass(new POSTPROCESSING.RenderPass(vm.scene, vm.camera));
      vm.bloomEffect = new POSTPROCESSING.BloomEffect();
      vm.bloomEffect.intensity = vm.postprocessing.blurIntensity;
      const effectPass = new POSTPROCESSING.EffectPass(vm.scene, vm.bloomEffect);
      effectPass.renderToScreen = true;
      vm.composer.addPass(effectPass);

      // -- create light
      const light1 = new THREE.PointLight(0xffffff, 2);
      light1.position.set(0.0, 3.0, 5.0);
      const light1Helper = new THREE.PointLightHelper(light1, 0.5, 0xffffff);

      const light2 = new THREE.PointLight(0xffffff, 2);
      light2.position.set(0.0, 1.0, -5.0);
      const light2Helper = new THREE.PointLightHelper(light2, 0.5, 0xffffff);

      const light3 = new THREE.PointLight(0xffffff, 2);
      light3.position.set(5.0, 3.0, 0.0);
      const light3Helper = new THREE.PointLightHelper(light3, 0.5, 0xffffff);

      const light4 = new THREE.PointLight(0xffffff, 2);
      light4.position.set(-5.0, 1.0, 0.0);
      const light4Helper = new THREE.PointLightHelper(light4, 0.5, 0xffffff);

      vm.scene.add(light1);
      vm.scene.add(light2);
      vm.scene.add(light3);
      vm.scene.add(light4);
      vm.scene.add(light1Helper);
      vm.scene.add(light2Helper);
      vm.scene.add(light3Helper);
      vm.scene.add(light4Helper);

      // -- create object
      vm.loader = new GLTFLoader();
      vm.loader.load(vm.model_path, vm.onLoaderFinish, undefined, vm.onLoaderError);
    },
    render: function() {
      const vm = this;
      requestAnimationFrame(vm.render);
      vm.orbitControls.update();

      vm.onUpdateObject(vm);
      vm.bloomEffect.intensity = vm.postprocessing.blurIntensity;
      vm.composer.render();
      // vm.renderer.render(vm.scene, vm.camera);
    },
    onLoaderFinish: function(gltf) {
      const vm = this;
      vm.modelLoadingComplete = true;
      console.log('GLTF / data: ', gltf);
      vm.model = gltf.scene.children[0];
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

      vm.datGUI
        .add(vm.postprocessing, 'blurIntensity')
        .min(0)
        .max(5)
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
  beforeDestroy: function() {
    console.log('*** before destroy ***');
    const vm = this;
    vm.datGUI.destroy();
  },
  Destroy: function() {},
};
