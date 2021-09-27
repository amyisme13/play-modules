import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Router } from 'vue-router';

import { useAuthStore } from '@/store/auth';
import { useFeaturesStore } from '@/store/features';
import { useErrorStore } from '@/store/error';
import { errorRoutes } from '.';

NProgress.configure({ showSpinner: false });

export const configure = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    NProgress.start();

    const auth = useAuthStore();
    const features = useFeaturesStore();

    // Load data when not loaded yet.
    if (auth.authenticated && !auth.user) {
      await auth.loadUser();
    }

    if (!features.loaded) {
      features.fetchFeatures();
      features.routes.forEach((route) => router.addRoute(route));
      errorRoutes.forEach((route) => router.addRoute(route));

      next({ ...to, replace: true });
      return;
    }

    // Check using meta
    if (!auth.authenticated && to.meta?.requireAuth) {
      next({ name: 'login', query: { redirectTo: to.fullPath } });
      return;
    }

    if (auth.authenticated && to.meta?.requireGuest) {
      next({ name: 'home' });
      return;
    }

    // Check if need to be redirected after auth
    let shouldRedirectTo = from.query.redirectTo;
    if (Array.isArray(shouldRedirectTo)) {
      shouldRedirectTo = shouldRedirectTo[0];
    }

    if (!auth.authenticated && shouldRedirectTo && !to.query.redirectTo) {
      next({ ...to, query: { redirectTo: shouldRedirectTo } });
      return;
    }

    if (auth.authenticated && shouldRedirectTo && shouldRedirectTo !== to.fullPath) {
      next(shouldRedirectTo);
      return;
    }

    next();
  });

  router.afterEach((_) => {
    const error = useErrorStore();

    NProgress.done();

    if (error.shouldReset) {
      error.$patch({ error: null, status: 400 });
    }
  });
};
