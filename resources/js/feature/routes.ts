import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: () => import('../layouts/AuthLayout.vue'),
    redirect: 'login',
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('../views/Auth/Login.vue'),
        meta: {
          requireGuest: true,
        },
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('../views/Auth/Register.vue'),
        meta: {
          requireGuest: true,
        },
      },
      {
        path: '2fa',
        name: '2fa-challenge',
        component: () => import('../views/Auth/TwoFactorChallenge.vue'),
        meta: {
          requireGuest: true,
        },
      },
      {
        path: 'forgot',
        name: 'forgot-password',
        component: () => import('../views/Auth/ForgotPassword.vue'),
        meta: {
          requireGuest: true,
        },
      },
      {
        path: 'reset',
        name: 'reset-password',
        component: () => import('../views/Auth/ResetPassword.vue'),
        meta: {
          requireGuest: true,
        },
      },
    ],
  },
  {
    path: '/',
    component: () => import('../layouts/AppLayout.vue'),
    redirect: 'home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/Home.vue'),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: 'account',
        name: 'account-settings',
        component: () => import('../views/Account/Index.vue'),
        meta: {
          requireAuth: true,
        },
      },
      // {
      //   path: 'roles',
      //   name: 'role-management',
      //   component: () => import( '../views/Roles/Index.vue'),
      //   meta: {
      //     requireAuth: true,
      //   },
      // },
    ],
  },
];

export default routes;
