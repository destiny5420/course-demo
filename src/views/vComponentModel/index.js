import ComponentModelChild from '@/components/cComponentModelChild/index.vue';

export default {
  name: 'vComponentModal',
  props: {},
  components: {
    ComponentModelChild,
  },
  data: function() {
    return {
      test: false,
    };
  },
  methods: {
    eventHandler: function() {
      console.log('parent event handler !!');
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
