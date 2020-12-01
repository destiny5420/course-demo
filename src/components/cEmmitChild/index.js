export default {
  name: 'cEmmitChild',
  props: {
    props_titleName: String,
  },
  components: {},
  data: function() {
    return {
      inputData: '',
    };
  },
  methods: {
    inputDataToParent: function() {
      this.$emit('update-child-txt', this.inputData);
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
