import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
// import { TransformControls } from 'three/examples/jsm/controls/TransformControls';

export default {
  name: 'vThreeWave',
  props: {},
  components: {},
  data: function() {
    return {
      three: {
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
        fov: 75.0,
        amountX: 50,
        amountY: 50,
        SEPARATION: 10,
      },
      particles: [],
      particleCount: 0,
    };
  },
  methods: {
    init: function() {
      console.log('-- Initialize Function --');
      const vm = this;

      vm.three.stats = new Stats();
      document.getElementById('canvas-render').appendChild(vm.three.stats.dom);

      vm.createScene();
      vm.createObj();
      vm.createLight();
      vm.createHelper();
      vm.renderScene();
    },
    createScene: function() {
      console.log('-- createScene Function --');
      const vm = this;

      // -- create scene
      vm.three.scene = new THREE.Scene();

      // -- create camera
      vm.three.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      vm.three.camera.position.set(155, 155, 155);

      vm.three.renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer({ antialias: true }) : new THREE.CanvasRenderer();
      vm.three.renderer.setSize(window.innerWidth, window.innerHeight);
      vm.three.renderer.setClearColor(0x07074e, 1);

      const renderDomElement = document.getElementById('canvas-render');
      renderDomElement.appendChild(vm.three.renderer.domElement);

      // -- OrbitControls
      vm.three.orbitControls = new OrbitControls(vm.three.camera, vm.three.renderer.domElement);

      const particleGeometry = new THREE.Geometry();
      const particleMaterial = new THREE.SpriteMaterial({
        color: 0xffffff,
        // program: function(context) {
        //   context.beginPath();
        //   context.arc(0, 0, 0.4, 0, Math.PI * 2, true);
        //   context.fill();
        // },
      });

      let i = 0;
      for (let ix = 0; ix < vm.configure.amountX; ix += 1) {
        for (let iy = 0; iy < vm.configure.amountY; iy += 1) {
          const particle = new THREE.Sprite(particleMaterial);
          particle.position.x = ix * vm.configure.SEPARATION - (vm.configure.amountX * vm.configure.SEPARATION) / 2;
          particle.position.z = iy * vm.configure.SEPARATION - (vm.configure.amountY * vm.configure.SEPARATION) / 2;
          vm.particles[i] = particle;
          i += 1;
          vm.three.scene.add(particle);

          if (i > 0) {
            particleGeometry.vertices.push(particle.position);
          }
        }
      }
    },
    createObj: function() {
      console.log('-- createObj Function --');
      const vm = this;

      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
      vm.objs.cube = new THREE.Mesh(geometry, material);
      vm.three.scene.add(vm.objs.cube);

      vm.three.camera.position.z = 5;
    },
    createLight: function() {
      const vm = this;
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      vm.three.scene.add(directionalLight);
    },
    createHelper: function() {
      const vm = this;

      const size = 10;
      const divisions = 10;
      const gridHelper = new THREE.GridHelper(size, divisions);
      vm.three.scene.add(gridHelper);
    },
    renderScene: function() {
      const vm = this;
      requestAnimationFrame(vm.renderScene); // 產生動畫

      // vm.objs.cube.rotation.x += 0.01;
      // vm.objs.cube.rotation.y += 0.01;
      // vm.stats.update();
      // vm.objectUpdate();
      // vm.lightUpdate();
      // vm.animationUpdate();
      vm.updateParticle();

      vm.three.renderer.render(vm.three.scene, vm.three.camera);
      vm.three.stats.update();
    },
    updateParticle: function() {
      const vm = this;
      let i = 0;
      for (let ix = 0; ix < vm.configure.amountX; ix += 1) {
        for (let iy = 0; iy < vm.configure.amountY; iy += 1) {
          const particle = vm.particles[i];

          // particle.position.y = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50);
          particle.position.y = Math.sin((ix + vm.particleCount) * 0.3) * 15 + Math.sin((iy + vm.particleCount) * 0.5) * 15;
          // particle.scale.x = (Math.sin((ix + vm.particleCount) * 0.3) + 1) * 4 + (Math.sin((iy + vm.particleCount) * 0.5) + 1) * 4;
          i += 1;
        }
      }

      vm.particleCount += 0.1;
    },
  },
  computed: {},
  // life cycle
  beforeCreate: function() {},
  created: function() {
    console.log('*** three wave created ***');
  },
  beforeMounted: function() {},
  mounted: function() {
    console.log('*** three wave mounted ***');
    const vm = this;

    vm.init();
  },
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {},
  Destroy: function() {},
};
