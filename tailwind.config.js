/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Accent principal
        primary: '#7C3AED',
        'primary-light': '#A855F7',
        // Fonds pastels
        'pastel-blue': '#EFF6FF',
        'pastel-purple': '#F5F3FF',
        'pastel-pink': '#FDF4FF',
        'pastel-base': '#FAFBFF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
