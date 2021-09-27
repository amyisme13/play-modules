import colors from 'windicss/colors';
import defaultTheme from 'windicss/defaultTheme';
import { defineConfig } from 'windicss/helpers';
import forms from 'windicss/plugin/forms';

export default defineConfig({
  plugins: [forms],

  extract: {
    include: ['resources/**/*.{vue,php}', 'modules/*/Resources/**/*.{vue,php}'],
    exclude: ['node_modules', '.git'],
  },

  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        success: colors.green,
        error: colors.red,
        info: colors.blue,
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
});
