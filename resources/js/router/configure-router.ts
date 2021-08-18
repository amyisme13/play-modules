import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Router, { Route } from 'vue-router';

import { FeaturesModule } from '@/store/features';
import { AuthModule } from '@/store/auth';
import { ErrorModule } from '@/store/error';

NProgress.configure({ showSpinner: false });

export const configure = (router: Router) => {
  router.beforeEach(async (to: Route, _: Route, next: any) => {
    NProgress.start();

    const { authenticated } = AuthModule;

    if (!authenticated && to.meta?.requireAuth) {
      next({ name: 'login', query: { redirectTo: to.fullPath } });
      return;
    }

    if (authenticated && to.meta?.requireGuest) {
      next({ name: 'home' });
      return;
    }

    if (authenticated && !AuthModule.user) {
      await AuthModule.loadUser();
    }

    if (!FeaturesModule.loaded) {
      FeaturesModule.fetchFeatures();
      router.addRoutes(FeaturesModule.routes);

      next({ ...to, replace: true });
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
