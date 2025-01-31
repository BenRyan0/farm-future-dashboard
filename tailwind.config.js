/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#05D849",
        text_color: "#d0d2d6",
        primary: "#02A367",
        primaryDark: "#04714A",
        lightBeige: "#EBF7F2",
      },
    },
  },
  plugins: [],
};
