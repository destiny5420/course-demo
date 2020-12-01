import cAlert from '@/components/cAlert/index.vue';

export default {
  name: 'vRoot',
  props: {},
  components: {
    cAlert,
  },
  data: function() {
    return {
      menuDatas: [
        { name: 'Home', link: '/' },
        { name: 'Emmit', link: '/emmit' },
        { name: 'Bus', link: '/bus' },
        { name: 'FB-Login', link: '/fb-login' },
      ],
    };
  },
  methods: {},
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