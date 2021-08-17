import { RouteConfig } from 'vue-router';

export interface AppMenu {
  label: string;
  icon: string;
  routeName: string;
}

export interface AppFeature {
  name: string;
  routes: RouteConfig[];
  menus: AppMenu[];
}
