import Vue from 'vue';
import Root from '@/views/vRoot/index.vue';
import router from './router';
import store from './store';
import '@/assets/fb_auth_application';

Vue.config.productionTip = false;

Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  render: (h) => h(Root),
}).$mount('#app');
