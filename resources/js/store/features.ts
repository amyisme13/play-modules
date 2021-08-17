import { RouteConfig } from 'vue-router';
import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators';

import store from '@/store';
import { AppFeature, AppMenu } from '@/types/feature';

@Module({ dynamic: true, store, name: 'modules' })
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
  }

  @Action
  fetchFeatures() {
    const req = require.context('../../../modules/', true, /js\/feature.ts$/);
    const features = req.keys().map((key) => req(key).default);

    this.SET_FEATURES(features);
    this.SET_LOADED();
  }
}

export const FeaturesModule = getModule(Features);
