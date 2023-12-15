/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/templates/**/*.html',
    './src/js/**/*.js',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    colors: {
      "primary": '#6156E7',
    },
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
};
