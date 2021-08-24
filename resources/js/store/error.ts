import { VuexModule, Module, Mutation, getModule, Action } from 'vuex-module-decorators';

import { eventHub } from '@/plugins/vuetify';
import store from '@/store';
import { LaravelError } from '@/types/api';

@Module({ dynamic: true, store, name: 'error' })
class Error extends VuexModule {
  error: LaravelError | null = null;
  status = 400;

  dontReset = false;

  get formErrors() {
    if (this.error && this.error.errors) {
      return this.error.errors;
    }

    return {};
  }

  @Mutation
  RESET() {
    this.error = null;
    this.status = 400;
  }

  @Mutation
  SET_STATUS(status: number) {
    this.status = status;
  }

  @Mutation
  SET_ERROR(error: LaravelError) {
    this.error = error;
  }

  @Mutation
  SET_DONT_RESET(dontReset: boolean) {
    this.dontReset = dontReset;
  }

  @Action
  setError(error: { error: LaravelError; status: number }) {
    this.SET_ERROR(error.error);
    this.SET_STATUS(error.status);

    const snackbarStatuses = [403, 429, 500];
    if (snackbarStatuses.includes(error.status)) {
      eventHub.$emit('add', error.error.message, 'error');
    }
  }
}

export const ErrorModule = getModule(Error);
