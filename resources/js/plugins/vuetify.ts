import Vue from 'vue';
import Vuetify, { colors } from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      dark: {
        primary: colors.deepPurple.base,
      },
      light: {
        primary: colors.deepPurple.base,
      },
    },
  },
});

export const eventHub = new Vue({ name: 'event-hub' });

export const snackbar = (message: string, color = 'primary') => {
  eventHub.$emit('add', message, color);
};

Vue.prototype.$snackbar = snackbar;
