/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["variant", "&:not(.light *)"],
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
