import { markRaw } from 'vue';
import { AppModule } from '@/types';

import routes from './routes';

import HeartIcon from '~icons/heroicons-outline/heart';
import HomeIcon from '~icons/heroicons-outline/home';
import PuzzleIcon from '~icons/heroicons-outline/puzzle';
import TagIcon from '~icons/heroicons-outline/tag';

const module: AppModule = {
  name: 'Core',
  icon: markRaw(HeartIcon),
  routes,
  menus: [
    {
      label: 'Home',
      routeName: 'home',
      icon: markRaw(HomeIcon),
    },
    {
      label: 'Role Management',
      routeName: 'role-management',
      icon: markRaw(TagIcon),
      permissions: ['Manage permissions'],
    },
    {
      label: 'Module Management',
      routeName: 'module-management',
      icon: markRaw(PuzzleIcon),
      permissions: ['Manage modules'],
    },
  ],
};

export default module;
