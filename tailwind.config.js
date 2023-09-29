/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mainBgColor: '#FCF7E6',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Space Mono'],
      },
      screens: {
        sm: '390px',
        md: '769px',
        lg: '1028px',
        xl: '1440px',
      },
    },
  },
  plugins: [],
};
