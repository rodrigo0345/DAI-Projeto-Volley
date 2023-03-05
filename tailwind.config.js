/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './frontend/views/**/*.{js,ts,jsx,tsx}',
    './frontend/**/*.{js,ts,jsx,tsx}',
    './frontend/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {},
    },
  },
  plugins: [],
};
