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
      hp: null,
      textures: {},
      sprites: {},
      rotationSpeed: 0.01,
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
      vm.sprites.btn_play.buttonMode = true;
      /* mouse event | need to set interactive true */
      // vm.sprites.btn_play.on('tap', () => {
      //   console.log('tap player button');
      // });
      vm.sprites.btn_play.click = () => {
        alert('click player button');
      };

      vm.container.addChild(vm.sprites.btn_play);
      vm.container.pivot.set(0, 0);
      vm.container.position.set(0, 0);
      vm.createGraphics();

      console.log('awake / ', vm.container.width, ' / ', vm.container.height);
    },
    update: function() {
      // const vm = this;
      // if (vm.container.x >= 1280) {
      //   vm.velocity = -1;
      // } else if (vm.container.x <= 0) {
      //   vm.velocity = 1;
      // }
      // // control for container move
      // vm.container.x += vm.velocity * deltaTime * vm.speed;
      // control for container rotation
      // vm.container.rotation += vm.rotationSpeed * deltaTime;
      // container pos follow mouse x & y
      // vm.container.x = vm.application.renderer.plugins.interaction.mouse.global.x;
      // vm.container.y = vm.application.renderer.plugins.interaction.mouse.global.y;
    },
    createGraphics: function() {
      const vm = this;
      console.log('** create Graphics **');

      const graphicsRect = new PIXI.Graphics();
      graphicsRect.lineStyle(5, 0x000000, 1.0);
      graphicsRect.beginFill(0x000000);
      graphicsRect.drawRect(200, 200, 50, 50);
      graphicsRect.endFill();
      vm.container.addChild(graphicsRect);

      const graphicHpFrame = new PIXI.Graphics();
      graphicHpFrame.beginFill(0x000000);
      graphicHpFrame.drawRoundedRect(0, 0, 300, 50, 10);
      graphicHpFrame.endFill();
      vm.hp.addChild(graphicHpFrame);

      const graphicHpBar = new PIXI.Graphics();
      graphicHpBar.beginFill(0xff0000);
      graphicHpBar.drawRoundedRect(0, 0, 300, 50, 10);
      graphicHpBar.endFill();
      console.log('graphicHpBar: ', graphicHpBar);
      graphicHpBar.pivot.set(150, 0);
      graphicHpBar.x = 150;
      vm.hp.hpStatus = graphicHpBar;
      vm.hp.hpStatus.scale.x = 0.5;
      vm.hp.addChild(graphicHpBar);

      vm.hp.x = 500;
      vm.hp.y = 200;
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
      width: window.innerWidth - window.innerWidth * 0.15,
      height: window.innerHeight - 10,
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
    vm.hp = new PIXI.Container();
    vm.application.stage.addChild(vm.container);
    vm.application.stage.addChild(vm.hp);
    // const PIXIText = new PIXI.Text('Hello World', {
    //   fontFamily: 'Arial',
    //   fontSize: 100,
    //   fill: [0xeeee00, 0x00ff99],
    //   align: 'center',
    // });

    // vm.container.addChild(PIXIText);

    function onLoadProgressHandler(loader, resource) {
      console.log('loading: ', resource.url);
      console.log(`progress: ${loader.progress}%`);
    }

    function onSetup(loader, resource) {
      console.log('onSetup');

      vm.textures.btn_play = resource.btn_play.texture;
      vm.awake();
    }

    const loader = new PIXI.Loader();
    loader
      .add('btn_play', btnPlayAssets, function() {
        console.log('btn_play loading complete!!');
      })
      .add('btn_assets', 'https://i.imgur.com/SkUNDOQ.jpg', function() {
        console.log('btn_assets loading complete!!');
      })
      .load(onSetup);

    loader.onProgress.add(onLoadProgressHandler);
  },
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {},
  Destroy: function() {},
};
