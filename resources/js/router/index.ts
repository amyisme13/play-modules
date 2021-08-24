import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';

import config from '@/utils/config';
import { configure } from './configure-router';

import NotFound from '@/views/Error/NotFound.vue';

Vue.use(Router);

// These routes will be added last.
export const errorRoutes: RouteConfig[] = [
  {
    path: '*',
    name: 'not-found',
    component: NotFound,
  },
];

const createRouter = () =>
  new Router({
    mode: 'history',
    base: config.basePath,
    routes: [],
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export const resetRouter = () => {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher; // reset router
};

configure(router);

export default router;
