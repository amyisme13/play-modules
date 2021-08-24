import { AppFeature } from '@/types/feature';
import routes from './routes';

const feature: AppFeature = {
  name: 'core',
  routes,
  menus: [
    {
      label: 'Home',
      routeName: 'home',
      icon: 'mdi-home',
    },
    {
      label: 'Role Management',
      routeName: 'role-management',
      icon: 'mdi-account-lock',
      permissions: ['Manage permissions'],
    },
  ],
};

export default feature;
