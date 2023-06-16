// const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx,vue,html}'],
  theme: {
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    darkTheme: "dracula",
    themes: [
      "light",
      "dark",
      {
        doctors: {
          "primary": "#a82833",
          "secondary": "#7584e5",
          "accent": "#21a831",
          "neutral": "#28232f",
          "base-100": "#ffffff",
          "info": "#24aadb",
          "success": "#3ad9b2",
          "warning": "#fbd52d",
          "error": "#f66065",
        },
      },
      "dracula",
    ],
  },
}
