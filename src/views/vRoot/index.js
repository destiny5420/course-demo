import cAlert from '@/components/cAlert/index.vue';
import cNavBarButton from '@/components/cNavBarButton/index.vue';

export default {
  name: 'vRoot',
  props: {},
  components: {
    cAlert,
    cNavBarButton,
  },
  data: function() {
    return {
      menuDatas: [
        { name: 'Home', link: '/' },
        { name: 'Emmit', link: '/emmit' },
        { name: 'Bus', link: '/bus' },
        { name: 'FB-Login', link: '/fb-login' },
        { name: 'I18n', link: '/i18n' },
        { name: 'ComponentModel', link: '/componentModel' },
        { name: 'Pixi', link: '/pixi' },
        { name: 'Model-Three', link: '/model-three' },
        { name: 'Car-Three', link: '/car-three' },
        { name: 'Smoke-Three', link: '/smoke-three' },
        { name: 'Three-Wave', link: '/three-wave' },
        { name: 'PostprocessingEffect-Three', link: '/postprocessing-effect-three' },
        { name: 'ShaderSmile', link: '/shader-smile' },
        { name: 'MouseFollow', link: '/mouse-follow' },
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
