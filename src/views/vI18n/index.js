export default {
  name: 'vI18n',
  props: {},
  components: {},
  data: function() {
    return {};
  },
  methods: {
    $_setActiveLanguage: function(lang) {
      localStorage.setItem('language', lang);
    },
    $_setLang: function(eventTarget) {
      // const lang = eventTarget.target.dataset.lang;
      this.$_setActiveLanguage(eventTarget.target.dataset.lang);
      // return history.go(0);
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
