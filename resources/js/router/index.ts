import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';

import config from '@/utils/config';
import { configure } from './configure-router';

import AppLayout from '@/layouts/AppLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import Login from '@/views/Auth/Login.vue';
import Register from '@/views/Auth/Register.vue';
import TwoFactorChallenge from '@/views/Auth/TwoFactorChallenge.vue';
import Account from '@/views/Account/Index.vue';
import Home from '@/views/Home.vue';

Vue.use(Router);

const routes: RouteConfig[] = [
  {
    path: '/auth',
    component: AuthLayout,
    redirect: 'login',
    children: [
      {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
          requireGuest: true,
        },
      },
      {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
          requireGuest: true,
        },
      },
      {
        path: '/2fa',
        name: '2fa-challenge',
        component: TwoFactorChallenge,
        meta: {
          requireGuest: true,
        },
      },
    ],
  },
  {
    path: '/',
    component: AppLayout,
    redirect: 'home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
          requireAuth: true,
        },
      },
      {
        path: '/account',
        name: 'account-settings',
        component: Account,
        meta: {
          requireAuth: true,
        },
      },
    ],
  },
];

const createRouter = () =>
  new Router({
    mode: 'history',
    base: config.basePath,
    routes: routes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export const resetRouter = () => {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher; // reset router
};

configure(router);

export default router;
