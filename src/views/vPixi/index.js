import * as PIXI from 'pixi.js';
import btnPlayAssets from '@/assets/pixi_assets/button.png';

export default {
  name: 'vPixi',
  props: {},
  components: {},
  data: function() {
    return {
      application: null,
      container: null,
      textures: {},
      sprites: {},
      speed: 0.0,
      velocity: 1, // 1: forward | -1: back
    };
  },
  methods: {
    awake: function() {
      const vm = this;

      vm.sprites.btn_play = new PIXI.Sprite(vm.textures.btn_play);
      vm.sprites.btn_play.anchor.set(0.5);
      vm.sprites.btn_play.interactive = true;
      vm.sprites.btn_play.on('tap', () => {
        console.log('click player button');
      });

      vm.container.y = 360;
      vm.container.addChild(vm.sprites.btn_play);
    },
    update: function() {
      const vm = this;
      // console.log('mouse ', `/ x: {${vm.appliction.renderer.plugins.interaction.mouse.global.x}} / y: ${vm.appliction.renderer.plugins.interaction.mouse.global.y}`);
      // console.log('x: ', vm.application.renderer.plugins.interaction.mouse.global.x);
      // console.log('y: ', vm.application.renderer.plugins.interaction.mouse.global.y);
      // if (vm.container.x >= 1280) {
      //   vm.velocity = -1;
      // } else if (vm.container.x <= 0) {
      //   vm.velocity = 1;
      // }

      // vm.container.x += vm.velocity * deltaTime * vm.speed;

      vm.container.x = vm.application.renderer.plugins.interaction.mouse.global.x;
      vm.container.y = vm.application.renderer.plugins.interaction.mouse.global.y;
    },
  },
  computed: {},
  // life cycle
  beforeCreate: function() {},
  created: function() {},
  beforeMounted: function() {},
  mounted: function() {
    const vm = this;
    let type = 'WebGL';
    if (!PIXI.utils.isWebGLSupported()) {
      type = 'canvas';
    }

    PIXI.utils.sayHello(type);

    vm.application = new PIXI.Application({
      width: window.innerWidth,
      height: 720,
      antialias: true,
      transparent: false,
      backgroundColor: 0x00cc99,
    });

    const pixiContainer = document.getElementById('pixi');

    const body = document.querySelector('body');
    body.addEventListener('keydown', (e) => {
      const key = e.key || e.keyCode;
      console.log('key: ', key);
      switch (key) {
        case 'ArrowUp':
          vm.container.y -= 5;
          break;
        case 'ArrowDown':
          vm.container.y += 5;
          break;
        case 'ArrowLeft':
          vm.container.x -= 5;
          break;
        case 'ArrowRight':
          vm.container.x += 5;
          break;
        default:
          break;
      }
    });
    pixiContainer.appendChild(vm.application.view);

    vm.application.ticker.add(vm.update);

    vm.container = new PIXI.Container();
    vm.application.stage.addChild(vm.container);

    // const PIXIText = new PIXI.Text('Hello World', {
    //   fontFamily: 'Arial',
    //   fontSize: 100,
    //   fill: [0xeeee00, 0x00ff99],
    //   align: 'center',
    // });

    // vm.container.addChild(PIXIText);

    const loader = new PIXI.Loader();
    loader
      .add('btn_play', btnPlayAssets)
      .add('btn_assets', 'https://i.imgur.com/SkUNDOQ.jpg')
      .load((loader1, resource) => {
        console.log('Done');
        // store textures
        vm.textures.btn_play = resource.btn_play.texture;

        vm.awake();
      });
  },
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {},
  Destroy: function() {},
};
