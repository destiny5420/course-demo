import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/vHome/index.vue';
import Emmit from '@/views/vEmmit/index.vue';
import Bus from '@/views/vBus/index.vue';
import FBLogin from '@/views/vFBLogin/index.vue';
import ThreeWave from '@/views/vThreeWave/index.vue';
import I18n from '@/views/vI18n/index.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/emmit',
    name: 'Emmit',
    component: Emmit,
  },
  {
    path: '/bus',
    name: 'Bus',
    component: Bus,
  },
  {
    path: '/fb-login',
    name: 'FBLogin',
    component: FBLogin,
  },
  {
    path: '/three-wave',
    name: 'ThreeWave',
    component: ThreeWave,
  },
  {
    path: '/i18n',
    name: 'I18n',
    component: I18n,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
