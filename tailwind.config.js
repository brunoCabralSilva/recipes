/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      rotate: {
        '_45deg': '-45deg',
      },
      backgroundImage: {
        'marmore': "url('../src/images/marmore.jpg')",
        'textura': "url('../src/images/textura-marrom.png')",
      },
      colors: {
        'transp': 'rgb(240, 230, 224, 0)',
        'half-transp': 'rgb(0,0,0,0.8)',
        'min-transp': 'rgb(0,0,0,0.6)',
        'light-transp': 'rgb(255,255,255,0.7)',
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