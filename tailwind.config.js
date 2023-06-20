// const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')
const { themes } = require('./src/config/themes')

module.exports = {
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx,vue,html,svg}'],
  theme: {
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: themes,
  },
}
