const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
    container: {
      center: true,
    },
    extend: {},
  },
  plugins: [],
}
