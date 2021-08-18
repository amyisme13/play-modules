import 'vuetify/types/lib.d';

import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $snackbar: (message: string, color?: string) => void;
  }
}
