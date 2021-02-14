import * as dat from 'dat.gui';
import { Cursor } from './Cursor';
import { Showcase } from './Showcase';

export default {
  name: 'vMouseFollow',
  props: {},
  components: {},
  data: function() {
    return {
      cursor: null,
      showcase: null,
      datGUI: null,
      slidesData: [{ title: 'Segovia' }, { title: 'Barcelona' }, { title: 'Malaga' }, { title: 'Pamplona' }, { title: 'Bilbao' }],
      progress: 0,
      tmp: 0.1,
    };
  },
  methods: {},
  computed: {},
  // life cycle
  beforeCreate: function() {},
  created: function() {},
  beforeMounted: function() {},
  mounted: function() {
    const vm = this;
    vm.datGUI = new dat.GUI();
    vm.datGUI
      .add(vm, 'progress')
      .min(0)
      .max(1)
      .step(0.01);

    vm.datGUI
      .add(vm, 'tmp')
      .min(0)
      .max(1)
      .step(0.05);

    vm.cursor = new Cursor(
      document.querySelector(`.${vm.$style.cursor}`),
      document.querySelector(`.${vm.$style['cursor__inner--dot']}`),
      document.querySelector(`.${vm.$style['cursor__inner--circle']}`),
    );

    vm.showcase = new Showcase(vm.slidesData);
    vm.showcase.mount(vm.$refs.mainView);
    vm.showcase.render();
  },
  watch: {
    progress: {
      handler: function(cur) {
        if (!this.showcase) {
          return;
        }

        this.showcase.updateStickEffect(cur);
      },
      immediate: true,
    },
    tmp: {
      handler: function(cur) {
        if (!this.showcase) {
          return;
        }

        this.showcase.updateTmp(cur);
      },
      immediate: true,
    },
  },
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {
    const vm = this;
    vm.datGUI.destroy();
  },
  Destroy: function() {},
};
