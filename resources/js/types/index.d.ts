import { RouteConfig } from 'vue-router';

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
  name: string;
  icon: string;
  routes: RouteConfig[];
  menus: AppMenu[];
}
