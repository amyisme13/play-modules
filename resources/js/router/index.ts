import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';

import AppLayout from '@/layouts/AppLayout.vue';
import config from '@/utils/config';
import Home from '@/views/Home.vue';

Vue.use(Router);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'app',
    component: AppLayout,
    redirect: 'home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home,
      },
    ],
  },
];

export default new Router({
  mode: 'history',
  base: config.basePath,
  routes,
});
