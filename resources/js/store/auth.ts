import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators';

import { csrf, login, logout, user, register } from '@/api/auth';
import { resetRouter } from '@/router';
import store from '@/store';
import { LoginDTO, RegisterDTO, User } from '@/types/api';
import { getAuthenticated, setAuthenticated } from '@/utils/auth';

@Module({ dynamic: true, store, name: 'user' })
class Auth extends VuexModule {
  authenticated = getAuthenticated();
  user: User | null = null;

  @Mutation
  SET_AUTHENTICATED(authenticated: boolean) {
    this.authenticated = authenticated;
  }

  @Mutation
  SET_USER(user: User | null) {
    this.user = user;
  }

  @Action
  resetAuth() {
    resetRouter();
    this.SET_USER(null);
    this.SET_AUTHENTICATED(false);
    setAuthenticated(false);
  }

  @Action
  async login(credentials: LoginDTO) {
    await csrf();
    await login(credentials);

    this.SET_AUTHENTICATED(true);
    setAuthenticated(true);
  }

  @Action
  async register(userData: RegisterDTO) {
    await csrf();
    await register(userData);

    this.SET_AUTHENTICATED(true);
    setAuthenticated(true);
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
