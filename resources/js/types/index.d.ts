import { RouteRecordRaw } from 'vue-router';

export interface AppMenu {
  label: string;
  icon: string;
  routeName: string;
  permissions?: string[];
}

export interface AppMenuHeader {
  label: string;
  icon: string;
  menus: AppMenu[];
}

export interface AppFeature {
  module?: string;
  name: string;
  icon: string;
  routes: RouteRecordRaw[];
  menus: AppMenu[];
}
