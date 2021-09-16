import { AppFeature } from '@/types';
// import routes from './routes';

const feature: AppFeature = {
  name: 'Core',
  icon: 'mdi-atom',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/Home.vue'),
    },
  ],
  menus: [],
  // routes,
  // menus: [
  //   {
  //     label: 'Home',
  //     routeName: 'home',
  //     icon: 'mdi-home',
  //   },
  //   {
  //     label: 'Role Management',
  //     routeName: 'role-management',
  //     icon: 'mdi-account-lock',
  //     permissions: ['Manage permissions'],
  //   },
  // ],
};

export default feature;
