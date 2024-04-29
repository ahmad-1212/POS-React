/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
    },
    extend: {
      colors: {
        primary: {
          100: "#fde1d2",
          200: "#fbc4a6",
          300: "#faa679",
          400: "#f8894d",
          500: "#f66b20",
          600: "#c5561a",
          700: "#944013",
          800: "#622b0d",
          900: "#311506",
        },
      },
    },
  },
  plugins: [],
};
