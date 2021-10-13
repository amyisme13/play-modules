import { markRaw } from 'vue';

import AppLayout from '@/layouts/AppLayout.vue';
import type { AppFeature } from '@/types';

import GroupIcon from '~icons/heroicons-solid/user-group';

const feature: AppFeature = {
  name: 'User',
  icon: markRaw(GroupIcon),
  routes: [
    {
      path: '/user',
      component: markRaw(AppLayout),
      redirect: { name: 'user-management' },
      children: [
        {
          path: 'manage',
          name: 'user-management',
          component: () => import('../views/Management.vue'),
        },
        {
          path: 'form/:id?',
          name: 'user-form',
          component: () => import('../views/UserForm.vue'),
        },
      ],
    },
  ],
  menus: [
    {
      label: 'User Management',
      icon: markRaw(GroupIcon),
      routeName: 'user-management',
      permissions: ['Manage users'],
    },
  ],
};

export default feature;
