import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators';

import { csrf, login, logout, user, register, login2FA } from '@/api/auth';
import store from '@/store';
import { LoginDTO, RegisterDTO, TwoFactorDTO, AuthUser } from '@/types/api';
import { FeaturesModule } from './features';

@Module({ dynamic: true, store, name: 'auth' })
class Auth extends VuexModule {
  authenticated = false;
  user: AuthUser | null = null;

  @Mutation
  SET_AUTHENTICATED(authenticated: boolean) {
    this.authenticated = authenticated;
  }

  @Mutation
  SET_USER(user: AuthUser | null) {
    this.user = user;

    FeaturesModule.loadMenus();
  }

  @Action
  resetAuth() {
    this.SET_USER(null);
    this.SET_AUTHENTICATED(false);
  }

  @Action
  async login(credentials: LoginDTO) {
    await csrf();
    const { data } = await login(credentials);

    if (data?.two_factor) {
      return false;
    }

    this.SET_AUTHENTICATED(true);
    return true;
  }

  @Action
  async login2FA(credentials: TwoFactorDTO) {
    await login2FA(credentials);

    this.SET_AUTHENTICATED(true);
  }

  @Action
  async register(userData: RegisterDTO) {
    await csrf();
    await register(userData);

    this.SET_AUTHENTICATED(true);
  }

  @Action
  async loadUser() {
    const res = await user();
    this.SET_USER(res.data);
  }

  @Action
  async logout() {
    await logout();
    this.resetAuth();
  }
}

export const AuthModule = getModule(Auth);
