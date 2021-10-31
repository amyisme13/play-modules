import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';

import coreModule from '@/module';
import { AppModule, AppMenu, AppMenuHeader } from '@/types';
import { useAuthStore } from './auth';

function filterMenus(userPermissions: string[] | true, menus: AppMenu[]) {
  if (userPermissions === true) {
    return menus;
  }

  return menus.filter(
    (menu) =>
      !menu.permissions ||
      menu.permissions.every((permission) => userPermissions.includes(permission))
  );
}

interface State {
  loaded: boolean;
  active: string[];
  allModules: AppModule[];
  modules: AppModule[];
  routes: RouteRecordRaw[];
  menus: AppMenuHeader[];
}

export const useModulesStore = defineStore('modules', {
  state: (): State => ({
    loaded: false,
    active: [],
    allModules: [],
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

      this.allModules = nonCoreModules;
      this.modules = modules;
      this.routes = routes;
      this.loadMenus();

      this.loaded = true;
    },

    loadMenus() {
      const authStore = useAuthStore();
      const userPermissions = authStore.isSuperAdmin || authStore.user?.permissions || [];

      const menus = this.modules.reduce((acc, module) => {
        const filtered = filterMenus(userPermissions, module.menus);

        if (filtered.length > 0) {
          acc.push({ label: module.name, icon: module.icon, menus: filtered });
        }

        return acc;
      }, [] as AppMenuHeader[]);

      this.menus = menus;
    },
  },
});
