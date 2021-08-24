import { RouteConfig } from 'vue-router';

import AppLayout from '@/layouts/AppLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import ForgotPassword from '@/views/Auth/ForgotPassword.vue';
import Login from '@/views/Auth/Login.vue';
import Register from '@/views/Auth/Register.vue';
import ResetPassword from '@/views/Auth/ResetPassword.vue';
import TwoFactorChallenge from '@/views/Auth/TwoFactorChallenge.vue';
import Account from '@/views/Account/Index.vue';
import Home from '@/views/Home.vue';
import Roles from '@/views/Roles/Index.vue';

const routes: RouteConfig[] = [
  {
    path: '/auth',
    component: AuthLayout,
    redirect: 'login',
    children: [
      {
        path: 'login',
        name: 'login',
        component: Login,
        meta: {
          requireGuest: true,
        },
      },
      {
        path: 'register',
        name: 'register',
        component: Register,
        meta: {
          requireGuest: true,
        },
      },
      {
        path: '2fa',
        name: '2fa-challenge',
        component: TwoFactorChallenge,
        meta: {
          requireGuest: true,
        },
      },
      {
        path: 'forgot',
        name: 'forgot-password',
        component: ForgotPassword,
        meta: {
          requireGuest: true,
        },
      },
      {
        path: 'reset',
        name: 'reset-password',
        component: ResetPassword,
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
        component: Home,
        meta: {
          requireAuth: true,
        },
      },
      {
        path: 'account',
        name: 'account-settings',
        component: Account,
        meta: {
          requireAuth: true,
        },
      },
      {
        path: 'roles',
        name: 'role-management',
        component: Roles,
        meta: {
          requireAuth: true,
        },
      },
    ],
  },
];

export default routes;
