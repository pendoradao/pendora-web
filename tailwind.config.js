/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '300px',
      ...defaultTheme.screens
    },
    extend: {
      colors: {
        brand: colors.fuchsia,
        background: "#fffcf8",
        surface: "#fff",
        primary: colors.zinc,
        secondary: colors.fuchsia,
        success: colors.green,
        info: colors.yellow,
        warning: colors.orange,
        danger: colors.red,
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    // require('@tailwindcss/aspect-ratio'),
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/line-clamp')
  ]
};
