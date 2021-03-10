const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      vinco: {
        lightest: '#7BDBD2',
        light: '#68CDC3',
        DEFAULT: '#04AC9C',
      },
      teal: colors.teal,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
