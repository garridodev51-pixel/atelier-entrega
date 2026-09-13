/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Outfit", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#1a1612",
        paper: "#f6f1ea",
        sand: "#e8ddd0",
        gold: "#b08d57",
        mist: "#8a8178",
      },
    },
  },
  plugins: [],
};
