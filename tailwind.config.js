/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enables dark mode using the "class" strategy
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true, // Centers the container
        padding: '0', // Removes default padding
      },
      boxShadow: {
        'custom': 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
      },
      colors: {
        background: "var(--background)", 
        foreground: "var(--foreground)", 
      },
      fontFamily: {
        luxia: ['Luxia', 'sans-serif'],
      },

       keyframes: {
        'shake-vertical': {
          '0%, 100%': { transform: 'translateY(0)' },
          '25%': { transform: 'translateY(-4px)' },
          '75%': { transform: 'translateY(4px)' },
        },
      },
      animation: {
        'shake-vertical': 'shake-vertical 3s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('tailwindcss-pseudo-elements')({
      customPseudoClasses: ['before', 'after'],
      contentUtilities: true,
    }),
  ],
};
