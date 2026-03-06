/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2E8B57',
        accent: '#4CAF50',
        muted: '#e9f5ee'
      }
    }
  },
  plugins: []
};
