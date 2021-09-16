// import AppLayout from '@/layouts/AppLayout.vue';
import type { AppFeature } from '@/types';

const feature: AppFeature = {
  name: 'User',
  icon: 'mdi-account-group',
  routes: [
    // {
    //   path: '/user',
    //   component: AppLayout,
    //   redirect: { name: 'user-management' },
    //   children: [
    //     {
    //       path: '',
    //       name: 'user-management',
    //       component: () =>
    //         import(/* webpackChunkName: "views/user/management" */ '../views/Management.vue'),
    //     },
    //     {
    //       path: 'form/:id?',
    //       name: 'user-form',
    //       component: () =>
    //         import(/* webpackChunkName: "views/user/form" */ '../views/UserForm.vue'),
    //     },
    //   ],
    // },
  ],
  menus: [
    {
      label: 'User Management',
      icon: 'mdi-account-cog',
      routeName: 'user-management',
      permissions: ['Manage users'],
    },
  ],
};

export default feature;
