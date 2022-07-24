/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'marmore': "url('../src/images/marmore.jpg')",
        'textura': "url('../src/images/textura-marrom.png')",
      },
      colors: {
        'madeira': 'rgb(104,75,57)',
        'bege': 'rgb(240, 230, 224)',
        'transp': 'rgb(240, 230, 224, 0)',
      },
    },
  },
  plugins: [],
}
