export default {
  name: 'cComponentModelChild',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: 'active',
    event: 'eventHandle',
  },
  components: {},
  data: function() {
    return {};
  },
  methods: {
    clickHandler: function() {
      console.log('child-click-handler');
      this.$emit('eventHandle', !this.active);
    },
  },
  computed: {},
  // life cycle
  beforeCreate: function() {},
  created: function() {},
  beforeMounted: function() {},
  mounted: function() {},
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {},
  Destroy: function() {},
};
