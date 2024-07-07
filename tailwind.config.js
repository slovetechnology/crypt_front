/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "orange": "#E96E28",
        "semi-white": "#e0dfdf",
        "ground": "#94A3B8"
      },
      boxShadow: {
        "sign-sha" : "0px 1px 10px rgb(223, 222, 222)"
      }
    },
  },
  plugins: [],
}
