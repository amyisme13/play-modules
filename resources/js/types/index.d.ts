import { RouteRecordRaw } from 'vue-router';
import Icon from '~icons/heroicons-outline/heart';

export interface AppMenu {
  label: string;
  icon: typeof Icon;
  routeName: string;
  permissions?: string[];
}

export interface AppMenuHeader {
  label: string;
  icon: typeof Icon;
  menus: AppMenu[];
}

export interface AppFeature {
  module?: string;
  name: string;
  icon: typeof Icon;
  routes: RouteRecordRaw[];
  menus: AppMenu[];
}
