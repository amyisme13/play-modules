import { RouteConfig } from 'vue-router';

import AppLayout from '@/layouts/AppLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';

const routes: RouteConfig[] = [
  {
    path: '/auth',
    component: AuthLayout,
    redirect: 'login',
    children: [
      {
        path: 'login',
        name: 'login',
        component: () =>
          import(/* webpackChunkName: "views/auth/login" */ '../views/Auth/Login.vue'),
        meta: {
          requireGuest: true,
        },
      },
      {
        path: 'register',
        name: 'register',
        component: () =>
          import(/* webpackChunkName: "views/auth/register" */ '../views/Auth/Register.vue'),
        meta: {
          requireGuest: true,
        },
      },
      {
        path: '2fa',
        name: '2fa-challenge',
        component: () =>
          import(
            /* webpackChunkName: "views/auth/two-fa-challenge" */ '../views/Auth/TwoFactorChallenge.vue'
          ),
        meta: {
          requireGuest: true,
        },
      },
      {
        path: 'forgot',
        name: 'forgot-password',
        component: () =>
          import(
            /* webpackChunkName: "views/auth/forgot-password" */ '../views/Auth/ForgotPassword.vue'
          ),
        meta: {
          requireGuest: true,
        },
      },
      {
        path: 'reset',
        name: 'reset-password',
        component: () =>
          import(
            /* webpackChunkName: "views/auth/reset-password" */ '../views/Auth/ResetPassword.vue'
          ),
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
        path: 'home',
        name: 'home',
        component: () => import(/* webpackChunkName: "views/home" */ '../views/Home.vue'),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: 'account',
        name: 'account-settings',
        component: () =>
          import(/* webpackChunkName: "views/account" */ '../views/Account/Index.vue'),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: 'roles',
        name: 'role-management',
        component: () => import(/* webpackChunkName: "views/roles" */ '../views/Roles/Index.vue'),
        meta: {
          requireAuth: true,
        },
      },
    ],
  },
];

export default routes;
