import cEmmitChild from '@/components/cEmmitChild/index.vue';

export default {
  name: 'vEmmit',
  props: {},
  components: {
    cEmmitChild,
  },
  data: function() {
    return {
      emmitTitle: 'EMMIT TITLE',
      childName: 'CHILD TITLE',
      childData: '',
    };
  },
  methods: {
    getChildText: function(value) {
      this.childData = value;
    },
  },
  computed: {},
  // life cycle
  beforeCreate: function() {},
  created: function() {},
  beforeMounted: function() {},
  mounted: function() {
    console.log(this);
  },
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {},
  Destroy: function() {},
};
