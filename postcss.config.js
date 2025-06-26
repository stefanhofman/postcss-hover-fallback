/**
 * Sample PostCSS configuration for using postcss-hover-fallback
 */
const hoverFallback = require('./src/index.js');
// require other PostCSS plugins as needed

module.exports = {
  plugins: [
    hoverFallback({
      // Optional: set to true to keep the original @media rule
      // preserveOriginal: false
    }),
    // Add other PostCSS plugins here if needed
  ]
};
