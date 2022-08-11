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
        'dark':'rgb(60, 33, 17)',
        'half-transp': 'rgb(0,0,0,0.8)',
        'min-transp': 'rgb(0,0,0,0.6)',
        'light-transp': 'rgb(255,255,255,0.7)',
        'dark-brown': 'rgb(38, 23, 14)',
        'light-brown': 'rgb(231, 215, 206)',
        'medium-brown': 'rgb(82, 58, 43)',
      },
      spacing: {
        '128': '35rem',
        '23%': '23%',
        '26%': '26%',
        '30%': '30%',
        '43%': '46%',
        '50%':'50%',
        '25vw':'25vw',
        '33vw':'33vw',
        '50vw': '50vw',
        '85vh': '85vh',
        '80vh': '80vh',
        '50vh':'50vh',
      }
    },
  },
  plugins: [],
}