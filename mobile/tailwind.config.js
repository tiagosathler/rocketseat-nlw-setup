/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#09090a',
      },
      fontFamily: {
        regular: 'inter400Regular',
        semibold: 'inter600SemiBold',
        bold: 'inter700Bold',
        extrabold: 'inter800ExtraBold',
      },
    },
  },
  plugins: [],
};
