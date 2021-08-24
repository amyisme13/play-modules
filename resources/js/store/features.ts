import { RouteConfig } from 'vue-router';
import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators';

import coreFeature from '@/feature';
import store from '@/store';
import { AppFeature, AppMenu } from '@/types/feature';

import { AuthModule } from './auth';

function filterMenus(menus: AppMenu[]) {
  if (AuthModule.user?.roles.includes('Super Admin')) {
    return menus;
  }

  const userPermissions = AuthModule.user?.permissions || [];

  return menus.filter((menu) => {
    if (!menu.permissions) {
      return true;
    }

    return menu.permissions.every((permission) => userPermissions.includes(permission));
  });
}

@Module({ dynamic: true, store, name: 'features' })
class Features extends VuexModule {
  loaded = false;
  features: AppFeature[] = [];
  routes: RouteConfig[] = [];
  menus: AppMenu[] = [];

  @Mutation
  SET_LOADED() {
    this.loaded = true;
  }

  @Mutation
  SET_FEATURES(features: AppFeature[]) {
    this.features = features;

    features.forEach((feature) => {
      this.routes.push(...feature.routes);
      this.menus.push(...feature.menus);
    });

    this.menus = filterMenus(this.menus);
  }

  @Action
  fetchFeatures() {
    const req = require.context('../../../modules/', true, /js\/feature\/index.ts$/);
    const features = [coreFeature, ...req.keys().map((key) => req(key).default)];

    this.SET_FEATURES(features);
    this.SET_LOADED();
  }
}

export const FeaturesModule = getModule(Features);
