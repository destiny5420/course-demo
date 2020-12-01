export default {
  name: 'cAlert',
  props: {},
  components: {},
  data: function() {
    return {};
  },
  methods: {
    showAlert: function(msg) {
      alert(msg);
    },
  },
  computed: {},
  // life cycle
  beforeCreate: function() {},
  created: function() {
    const vm = this;
    vm.$bus.$on('alert:message', (msg) => {
      vm.showAlert(msg);
    });
  },
  beforeMounted: function() {},
  mounted: function() {},
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {
    const vm = this;
    vm.$bus.$off('alert:message');
  },
  Destroy: function() {},
};
