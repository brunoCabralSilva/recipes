/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {     
      'mm': '615px',
      'sm':	'640px',
      'md':	'768px',
      'lg':	'1024px',
      'xl':	'1280px',
      '2xl':	'1536px',
    },
    minHeight: {
      '70vh': '70vh',
      '110vh': '110vh',
    },
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
        '95%':'95%',
        '25vw':'25vw',
        '33vw':'33vw',
        '50vw': '50vw',
        '70vh':'70vh',
        '85vh': '85vh',
        '80vh': '80vh',
        '50vh':'50vh',
        '30vh':'34vh',
        '95vh':'95vh',
        '110vh':'110vh',
      }
    },
  },
  plugins: [],
}