import colors from 'windicss/colors';
import defaultTheme from 'windicss/defaultTheme';
import { defineConfig } from 'windicss/helpers';
import forms from 'windicss/plugin/forms';
import lineClamp from 'windicss/plugin/line-clamp';

export default defineConfig({
  plugins: [forms, lineClamp],

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