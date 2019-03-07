import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/form',
      name: 'form',
      component: () => import('./views/Form/Form.vue'),
    },
    {
      path: '/media',
      name: 'Media',
      component: () => import('./views/Media.vue'),
    },
    {
      path: '/digital',
      name: 'Digital',
      component: () => import('./views/Digital.vue'),
    },
    {
      path: '/social',
      name: 'Social',
      component: () => import('./views/Social.vue'),
    },
    {
      path: '/commerce',
      name: 'Commerce',
      component: () => import('./views/Commerce.vue'),
    },
    {
      path: '/people',
      name: 'People',
      component: () => import('./views/People.vue'),
    },
  ],
});
