module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        MPlus1: ["M PLUS 1", "sans-serif"],
      },
      colors: {
        primary:"#F54C00",
        secondary:"#BBBBBB",
        primaryText:"#212529",
      },
    },
 
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
