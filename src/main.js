import Vue from 'vue';
import Root from '@/views/vRoot/index.vue';
import VueI18n from 'vue-i18n';
import i18n from '@/common/plugins/vue-i18n';
import router from './router';
import store from './store';
import '@/assets/fb_auth_application';

Vue.config.productionTip = false;
Vue.use(VueI18n);

Vue.prototype.$bus = new Vue();

new Vue({
  i18n: i18n,
  router: router,
  store: store,
  render: (h) => h(Root),
}).$mount('#app');
