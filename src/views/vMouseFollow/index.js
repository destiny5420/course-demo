import { Cursor } from './Cursor';

export default {
  name: 'vMouseFollow',
  props: {},
  components: {},
  data: function() {
    return {
      cursor: null,
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
  },
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {},
  Destroy: function() {},
};
