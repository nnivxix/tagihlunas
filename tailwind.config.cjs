/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lemon': '#C5FF6C',
        'semi-gray-1': '#ECEDEA',
        'semi-gray-2': '#CACACA',
        'semi-gray-3': '#8B8585',
        'purple-link': '#4F3CC9',
        'dark': '#333333',
      },
      backgroundColor: {
        'lemon': '#C5FF6C',
        'light-lemon': '#F0FFDA',
        'semi-gray': '#ECEDEA',
        'dark': '#333333'
      }
    },
  },
  plugins: [],
}
