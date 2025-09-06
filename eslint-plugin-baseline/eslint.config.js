import baselinePlugin from 'eslint-plugin-baseline';
import js from "@eslint/js";

export default [
  // This loads the standard recommended rules for JavaScript.
  js.configs.recommended,
  {
    // This tells ESLint which files to apply the configuration to.
    files: ["**/*.js"],
    // This adds your new plugin to the linter.
    plugins: {
      "baseline": baselinePlugin
    },
    // This is where we configure the language options.
    languageOptions: {
      // This tells ESLint to parse the latest version of ECMAScript.
      ecmaVersion: 2023,
      sourceType: "module",
    },
    // This is where you enable your custom rule.
    rules: {
      'baseline/no-non-baseline-features': 'error'
    }
  }
];