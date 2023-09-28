/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        mainBgColor: '#FCF7E6',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Space Mono'],
      },
    },
  },
  plugins: [],
};
