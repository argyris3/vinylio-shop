/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  fontFamily: {
    display: ['Outfit'],
  },
  plugins: [require('daisyui')],
};
