/** @type {import('tailwindcss').Config} */
export default {
<<<<<<< HEAD
  content: [
    './index.html', './src/**/*.{js,ts,jsx,tsx}',
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", 
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",],
=======
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
>>>>>>> 85f70d7afd0f3aef29eea3e0162201894209f029
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
};
