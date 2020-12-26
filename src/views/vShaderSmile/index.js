// import * as THREE from 'three';

function init() {
  console.log('*** [shader smile] init ***');
}

function animate() {
  console.log('*** [shader smile] animate ***');
}

export default {
  name: 'vShaderSmile',
  props: {},
  components: {},
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  // life cycle
  beforeCreate: function() {},
  created: function() {},
  beforeMounted: function() {},
  mounted: function() {
    init();
    animate();
  },
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {},
  Destroy: function() {},
};
