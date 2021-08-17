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
