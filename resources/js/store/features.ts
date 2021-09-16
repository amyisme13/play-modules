import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';

import coreFeature from '@/feature';
import { AppFeature, AppMenu, AppMenuHeader } from '@/types';
import { AuthUser } from '@/types/api';
import { useAuthStore } from './auth';

type Menus = (AppMenu | AppMenuHeader)[];

function filterMenus(user: AuthUser | null, menus: AppMenu[]) {
  if (user?.roles.includes('Super Admin')) {
    return menus;
  }

  const userPermissions = user?.permissions || [];

  return menus.filter((menu) => {
    if (!menu.permissions) {
      return true;
    }

    return menu.permissions.every((permission) => userPermissions.includes(permission));
  });
}

interface State {
  loaded: boolean;
  active: string[];
  features: AppFeature[];
  routes: RouteRecordRaw[];
  menus: Menus;
}

export const useFeaturesStore = defineStore('features', {
  state: (): State => ({
    loaded: false,
    active: [],
    features: [],
    routes: [],
    menus: [],
  }),

  actions: {
    fetchFeatures() {
      const modules = import.meta.globEager('../../../modules/**/feature/index.ts');

      const nonCoreFeatures: AppFeature[] = Object.values(modules).map((module) => module.default);
      const activeFeatures = nonCoreFeatures.filter((feat) =>
        this.active.includes(feat.module || feat.name)
      );

      const features = [coreFeature, ...activeFeatures];

      const routes = features.reduce(
        (acc, feature) => acc.concat(feature.routes),
        [] as RouteRecordRaw[]
      );

      this.features = features;
      this.routes = routes;
      this.loadMenus();

      this.loaded = true;
    },

    loadMenus() {
      const authStore = useAuthStore();

      const menus = this.features.reduce((acc, feature) => {
        const filtered = filterMenus(authStore.user, feature.menus);

        if (feature.name === 'Core') {
          return acc.concat(filtered);
        }

        if (filtered.length > 0) {
          acc.push({ label: feature.name, icon: feature.icon, menus: filtered });
        }

        return acc;
      }, [] as Menus);

      this.menus = menus;
    },
  },
});
