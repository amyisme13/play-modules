import { defineStore } from 'pinia';

import { LaravelError } from '@/types/api';

interface State {
  error: LaravelError | null;
  status: number;
  shouldReset: boolean;
}

export const useErrorStore = defineStore('error', {
  state: (): State => ({
    error: null,
    status: 400,
    shouldReset: true,
  }),

  getters: {
    formErrors(state) {
      if (state.error && state.error.errors) {
        return state.error.errors;
      }

      return {};
    },
  },

  actions: {
    setError(error: LaravelError, status: number) {
      this.error = error;
      this.status = status;

      const snackbarStatuses = [403, 429, 500];
      if (snackbarStatuses.includes(status)) {
        // show snackbar
      }
    },
  },
});
