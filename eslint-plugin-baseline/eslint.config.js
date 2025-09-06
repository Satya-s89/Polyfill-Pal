// eslint.config.js
const baselinePlugin = require('eslint-plugin-baseline');
const js = require("@eslint/js");

module.exports = [
  js.configs.recommended,
  {
    plugins: {
      "baseline": baselinePlugin
    },
    rules: {
      "baseline/no-non-baseline-features": "warn"
    }
  }
];