import { defineStore } from 'pinia';

import { csrf, login, logout, user, register, login2FA } from '@/api/auth';
import { LoginDTO, RegisterDTO, TwoFactorDTO, AuthUser } from '@/types/api';
import { useModulesStore } from './modules';

interface State {
  authenticated: boolean;
  user: AuthUser | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): State => ({
    authenticated: false,
    user: null,
  }),

  getters: {
    isSuperAdmin(state) {
      return state.user && state.user.roles.includes('Super Admin');
    },
  },

  actions: {
    async login(credentials: LoginDTO) {
      await csrf();
      const { data } = await login(credentials);

      if (data?.two_factor) {
        return false;
      }

      this.authenticated = true;
      return true;
    },

    async login2FA(credentials: TwoFactorDTO) {
      await login2FA(credentials);

      this.authenticated = true;
    },

    async register(userData: RegisterDTO) {
      await csrf();
      await register(userData);

      this.authenticated = true;
    },

    async loadUser() {
      const res = await user();
      this.user = res.data;

      useModulesStore().loadMenus();
    },

    async logout() {
      await logout();
      this.$reset();
    },
  },
});
