module.exports = {
  important: true,
  variants: {},
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true
  },
  purge: {
    enabled: true,
    content: [
      './src/**/*.html',
      './src/**/*.vue',
      './src/**/*.jsx'
    ]
  },
  theme: {
    extend: {},
    screens: {
      // Match Element UI breakpoints
      sm: '768px',
      md: '992px',
      lg: '1200px',
      xl: '1920px'
    }
  }
};
