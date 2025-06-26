/**
 * Example script: Run postcss-hover-fallback on a CSS file and print the result.
 *
 * Usage:
 *   node example/example.js input.css [output.css]
 */

const fs = require('node:fs');
const postcss = require('postcss');
const hoverFallback = require('../src/index.js');

const [,, inputFile, outputFile] = process.argv;

if (!inputFile) {
  console.error('Usage: node example/example.js <input.css> [output.css]');
  process.exit(1);
}

const css = fs.readFileSync(inputFile, 'utf8');

postcss([hoverFallback()])
  .process(css, { from: inputFile, to: outputFile })
  .then(result => {
    if (outputFile) {
      fs.writeFileSync(outputFile, result.css, 'utf8');
      console.log(`Output written to ${outputFile}`);
    } else {
      console.log(result.css);
    }
  })
  .catch(err => {
    console.error('Error processing CSS:', err);
    process.exit(1);
  });
