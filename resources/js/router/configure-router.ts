import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Router, { Route } from 'vue-router';

import { FeaturesModule } from '@/store/features';
import { AuthModule } from '@/store/auth';
import { ErrorModule } from '@/store/error';
import { errorRoutes } from '.';

NProgress.configure({ showSpinner: false });

export const configure = (router: Router) => {
  router.beforeEach(async (to: Route, from: Route, next: any) => {
    NProgress.start();

    const { authenticated } = AuthModule;
    const shouldRedirectTo = from.query.redirectTo;

    if (authenticated && !AuthModule.user) {
      await AuthModule.loadUser();
    }

    if (!FeaturesModule.loaded) {
      FeaturesModule.fetchFeatures();
      router.addRoutes(FeaturesModule.routes);
      router.addRoutes(errorRoutes);

      next({ ...to, replace: true });
      return;
    }

    if (!authenticated && to.meta?.requireAuth) {
      next({ name: 'login', query: { redirectTo: to.fullPath } });
      return;
    }

    if (!authenticated && shouldRedirectTo && !to.query.redirectTo) {
      next({ ...to, query: { redirectTo: shouldRedirectTo } });
      return;
    }

    if (authenticated && shouldRedirectTo && shouldRedirectTo !== to.fullPath) {
      next(shouldRedirectTo);
      return;
    }

    if (authenticated && to.meta?.requireGuest) {
      next({ name: 'home' });
      return;
    }

    next();
  });

  router.afterEach((_: Route) => {
    NProgress.done();

    if (!ErrorModule.dontReset) {
      ErrorModule.RESET();
    }
  });
};
