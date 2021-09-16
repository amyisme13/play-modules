import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import config from '@/utils/config';
import NotFound from '@/views/Error/NotFound.vue';
import { configure } from './configure-router';

const router = createRouter({
  history: createWebHistory(config.basePath),
  routes: [],
});

// These routes will be added last.
export const errorRoutes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)',
    name: 'not-found',
    component: NotFound,
  },
];

configure(router);

export default router;
