postcss-hover-fallback/README.md
# postcss-hover-fallback

[![npm version](https://badge.fury.io/js/postcss-hover-fallback.svg)](https://badge.fury.io/js/postcss-hover-fallback)

A PostCSS plugin that provides a fallback for `@media (hover: hover)` queries by converting them into standard `:hover` selectors. This is useful for supporting browsers that do not understand the `hover` media feature (such as older browsers or ES5 environments).

## Why?

Some browsers do not support the [`@media (hover: hover)`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover) media query, which is used to apply styles only on devices that support hover interactions (like desktops). This plugin generates fallback `:hover` rules for better compatibility.

## Installation

```sh
bun add postcss-hover-fallback
# or
npm install postcss-hover-fallback
# or
yarn add postcss-hover-fallback
```

## Usage

Add `postcss-hover-fallback` to your PostCSS configuration:

```js
// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-hover-fallback')({
      // Optional: set to true to keep the original @media rule
      // preserveOriginal: false
    })
  ]
};
```

### Example

**Input:**
```css
@media (hover: hover) {
  .button {
    color: red;
  }
}
```

**Output:**
```css
.button:hover {
  color: red;
}
```

## Options

- `preserveOriginal` (default: `false`):  
  If set to `true`, the original `@media (hover: hover)` block will be preserved alongside the fallback.

## License

MIT © [Your Name]