import { RouteConfig } from 'vue-router';
import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators';

import coreFeature from '@/feature';
import store from '@/store';
import { AppFeature, AppMenu, AppMenuHeader } from '@/types';
import { AuthModule } from './auth';

type Menus = (AppMenu | AppMenuHeader)[];

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

  active: string[] = [];

  features: AppFeature[] = [];
  routes: RouteConfig[] = [];
  menus: Menus = [];

  @Mutation
  SET_LOADED() {
    this.loaded = true;
  }

  @Mutation
  SET_ACTIVE(active: string[]) {
    this.active = active;
  }

  @Mutation
  SET_FEATURES(features: AppFeature[]) {
    this.features = features;
  }

  @Mutation
  SET_ROUTES(routes: RouteConfig[]) {
    this.routes = routes;
  }

  @Mutation
  SET_MENUS(menus: Menus) {
    this.menus = menus;
  }

  @Action
  fetchFeatures() {
    const req = require.context('../../../modules/', true, /js\/feature\/index.ts$/);
    const nonCoreFeatures: AppFeature[] = req.keys().map((key) => req(key).default);
    const activeFeatures = nonCoreFeatures.filter((feat) => this.active.includes(feat.name));

    const features = [coreFeature, ...activeFeatures];

    const routes = features.reduce(
      (acc, feature) => acc.concat(feature.routes),
      [] as RouteConfig[]
    );

    this.SET_FEATURES(features);
    this.SET_ROUTES(routes);
    this.loadMenus();

    this.SET_LOADED();
  }

  @Action
  loadMenus() {
    const menus = this.features.reduce((acc, feature) => {
      const filtered = filterMenus(feature.menus);

      if (feature.name === 'Core') {
        return acc.concat(filtered);
      }

      if (filtered.length > 0) {
        acc.push({ label: feature.name, icon: feature.icon, menus: filtered });
      }

      return acc;
    }, [] as Menus);

    this.SET_MENUS(menus);
  }
}

export const FeaturesModule = getModule(Features);
