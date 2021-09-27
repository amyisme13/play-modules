import { markRaw } from 'vue';
import { AppFeature } from '@/types';

import routes from './routes';

import HeartIcon from '~icons/heroicons-outline/heart';
import HomeIcon from '~icons/heroicons-outline/home';

const feature: AppFeature = {
  name: 'Core',
  icon: markRaw(HeartIcon),
  routes,
  menus: [
    {
      label: 'Home',
      routeName: 'home',
      icon: markRaw(HomeIcon),
    },
    // {
    //   label: 'Role Management',
    //   routeName: 'role-management',
    //   icon: 'mdi-account-lock',
    //   permissions: ['Manage permissions'],
    // },
  ],
};

export default feature;
