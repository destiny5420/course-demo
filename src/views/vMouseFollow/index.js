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
      slidesData: [{ title: 'Segovia' }, { title: 'Barcelona' }, { title: 'Malaga' }, { title: 'Pamplona' }, { title: 'Bilbao' }],
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

    vm.cursor = new Cursor(
      document.querySelector(`.${vm.$style.cursor}`),
      document.querySelector(`.${vm.$style['cursor__inner--dot']}`),
      document.querySelector(`.${vm.$style['cursor__inner--circle']}`),
    );

    vm.showcase = new Showcase(vm.slidesData);
  },
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {},
  Destroy: function() {},
};
