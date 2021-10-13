import colors from 'windicss/colors';
import defaultTheme from 'windicss/defaultTheme';
import { defineConfig } from 'windicss/helpers';
import forms from 'windicss/plugin/forms';
import lineClamp from 'windicss/plugin/line-clamp';

export default defineConfig({
  plugins: [forms, lineClamp],

  extract: {
    include: ['resources/**/*.{vue,ts,php}', 'modules/*/Resources/**/*.{vue,ts,php}'],
    exclude: ['node_modules', '.git'],
  },

  theme: {
    extend: {
      colors: {
        primary: colors.violet,
        success: colors.green,
        error: colors.red,
        info: colors.blue,
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        indeterminate: 'indeterminate 2s linear infinite',
      },
      keyframes: {
        indeterminate: {
          '0%': {
            transform: 'translateX(-45%) scaleX(0.1)',
          },
          '50%': {
            transform: 'translateX(10%) scaleX(0.3)',
          },
          '100%': {
            transform: 'translateX(50%) scaleX(0)',
          },
        },
      },
    },
  },
});
