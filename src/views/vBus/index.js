export default {
  name: 'vBus',
  props: {},
  components: {},
  data: function() {
    return {
      message: '這是我寫在Bus Component裡面的訊息',
    };
  },
  methods: {
    handleBusFunction: function(msg) {
      const vm = this;
      vm.$bus.$emit('alert:message', msg);
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
