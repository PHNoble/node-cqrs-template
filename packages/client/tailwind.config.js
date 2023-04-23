/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "fern-green": {
          50: "#f4f9f4",
          100: "#e6f2e6",
          200: "#cfe3cf",
          300: "#a8cda9",
          400: "#7aae7c",
          500: "#579059",
          600: "#437345",
          700: "#385d3a",
          800: "#304b31",
          900: "#293e2a",
          950: "#122113",
        },
        'corn-blue': {
          '50': '#f1f7fe',
          '100': '#e1eefd',
          '200': '#bdddfa',
          '300': '#83c2f6',
          '400': '#5cb0f1',
          '500': '#1988de',
          '600': '#0c6abd',
          '700': '#0b5599',
          '800': '#0d487f',
          '900': '#113e69',
          '950': '#0b2646',
        },
        'mantle': {
          '50': '#f7f8f7',
          '100': '#efefef',
          '200': '#dbdcdb',
          '300': '#bbbebd',
          '400': '#909593',
          '500': '#797e7b',
          '600': '#626765',
          '700': '#505452',
          '800': '#444847',
          '900': '#3c3e3e',
          '950': '#282928',
        },    
      },
    },
  },
  plugins: [],
};
