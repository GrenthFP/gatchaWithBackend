module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'football':"url('https://i.pinimg.com/originals/a9/88/a4/a988a47e605cacc02b0bb41c85270de3.jpg')"
      }),
      colors: {
        'accent-1': '#333',
      },
    },
  },
  variants: {},
  plugins: [],
}
