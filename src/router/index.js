import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/vHome/index.vue'),
  },
  {
    path: '/emmit',
    name: 'Emmit',
    component: () => import('@/views/vEmmit/index.vue'),
  },
  {
    path: '/bus',
    name: 'Bus',
    component: () => import('@/views/vBus/index.vue'),
  },
  {
    path: '/fb-login',
    name: 'FBLogin',
    component: () => import('@/views/vFBLogin/index.vue'),
  },
  {
    path: '/three-wave',
    name: 'ThreeWave',
    component: () => import('@/views/vThreeWave/index.vue'),
  },
  {
    path: '/i18n',
    name: 'I18n',
    component: () => import('@/views/vI18n/index.vue'),
  },
  {
    path: '/componentModel',
    name: 'ComponentModel',
    component: () => import('@/views/vComponentModel/index.vue'),
  },
  {
    path: '/pixi',
    name: 'Pixi',
    component: () => import('@/views/vPixi/index.vue'),
  },
  {
    path: '/model-three',
    name: 'ModelThree',
    component: () => import('@/views/vModelThree/index.vue'),
  },
  {
    path: '/smoke-three',
    name: 'SmokeThree',
    component: () => import('@/views/vSmokeThree/index.vue'),
  },
  {
    path: '/shader-smile',
    name: 'ShaderSmile',
    component: () => import('@/views/vShaderSmile/index.vue'),
  },
  {
    path: '/car-three',
    name: 'CarThree',
    component: () => import('@/views/vCarThree/index.vue'),
  },
  {
    path: '/postprocessing-effect-three',
    name: 'PostprocessingEffectThree',
    component: () => import('@/views/vPostprocessingEffectThree/index.vue'),
  },
  {
    path: '/mouse-follow',
    name: 'MouseFollow',
    component: () => import('@/views/vMouseFollow/index.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
