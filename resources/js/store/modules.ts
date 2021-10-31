import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';

import coreModule from '@/module';
import { AppModule, AppMenu, AppMenuHeader } from '@/types';
import { AuthUser } from '@/types/api';
import { useAuthStore } from './auth';

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
  modules: AppModule[];
  routes: RouteRecordRaw[];
  menus: AppMenuHeader[];
}

export const useModulesStore = defineStore('modules', {
  state: (): State => ({
    loaded: false,
    active: [],
    modules: [],
    routes: [],
    menus: [],
  }),

  actions: {
    fetchModules() {
      const imports = import.meta.globEager('../../../modules/**/module/index.ts');

      const nonCoreModules: AppModule[] = Object.values(imports).map((i) => i.default);
      const activeModules = nonCoreModules.filter((feat) =>
        this.active.includes(feat.module || feat.name)
      );

      const modules = [coreModule, ...activeModules];

      const routes = modules.reduce(
        (acc, module) => acc.concat(module.routes),
        [] as RouteRecordRaw[]
      );

      this.modules = modules;
      this.routes = routes;
      this.loadMenus();

      this.loaded = true;
    },

    loadMenus() {
      const authStore = useAuthStore();

      const menus = this.modules.reduce((acc, module) => {
        const filtered = filterMenus(authStore.user, module.menus);
        if (filtered.length > 0) {
          acc.push({ label: module.name, icon: module.icon, menus: filtered });
        }

        return acc;
      }, [] as AppMenuHeader[]);

      this.menus = menus;
    },
  },
});
