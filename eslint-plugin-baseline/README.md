# eslint-plugin-baseline

An ESLint plugin that helps you write cross-browser compatible JavaScript by detecting the use of web features that don't have "Widely available" baseline support according to the [web-features](https://github.com/web-platform-dx/web-features) dataset.

## What it does

This plugin analyzes your JavaScript code and warns you when you use methods or features that may not be supported across all browsers. It uses the official web-features dataset to determine which features have achieved "Widely available" baseline support (high baseline status) versus those that are still emerging or have limited support (low baseline status).

## Installation

```bash
npm install eslint-plugin-baseline --save-dev
```

## Usage

### ESLint Configuration (eslint.config.js)

```javascript
import baselinePlugin from 'eslint-plugin-baseline';

export default [
  {
    plugins: {
      baseline: baselinePlugin
    },
    rules: {
      'baseline/no-non-baseline-features': 'error'
    }
  }
];
```

### Legacy Configuration (.eslintrc.js)

```javascript
module.exports = {
  plugins: ['baseline'],
  rules: {
    'baseline/no-non-baseline-features': 'error'
  }
};
```

## Rules

### `baseline/no-non-baseline-features`

Disallows the use of JavaScript methods and features that don't have "Widely available" baseline support.

#### ✅ Valid Code Examples

```javascript
// These features have "high" baseline support (widely available)
const obj = { a: 1, b: 2 };
const keys = Object.keys(obj);

const str = 'hello';
const padded = str.padStart(10, '0'); // Widely supported

const arr = [1, 2, 3];
const flattened = arr.flat(); // Widely supported
```

#### ❌ Invalid Code Examples

```javascript
// These features have "low" baseline support (limited availability)
const arr = [3, 1, 2];
const sorted = arr.toSorted(); // ❌ Limited browser support

const copy = arr.toReversed(); // ❌ Limited browser support

const modified = arr.with(1, 'new'); // ❌ Limited browser support
```

#### Error Messages

When the rule detects a non-baseline feature, it will show:

```
The 'toSorted' method is not a Baseline 'Widely available' feature. Current support: low.
```

## Supported Features

The plugin currently monitors these JavaScript methods:

| Method | Feature | Baseline Status |
|--------|---------|----------------|
| `Array.prototype.flat()` | array-flat | ✅ High (widely available) |
| `Array.prototype.flatMap()` | array-flat | ✅ High (widely available) |
| `String.prototype.padStart()` | string-pad | ✅ High (widely available) |
| `String.prototype.padEnd()` | string-pad | ✅ High (widely available) |
| `Array.prototype.toSorted()` | array-by-copy | ⚠️ Low (limited support) |
| `Array.prototype.toReversed()` | array-by-copy | ⚠️ Low (limited support) |
| `Array.prototype.toSpliced()` | array-by-copy | ⚠️ Low (limited support) |
| `Array.prototype.with()` | array-by-copy | ⚠️ Low (limited support) |

## How it works

1. The plugin uses the [web-features](https://www.npmjs.com/package/web-features) dataset, which provides comprehensive information about web platform features and their browser support.

2. Each feature in the dataset has a baseline status:
   - **"high"**: Widely available across browsers (✅ allowed)
   - **"low"**: Available but with limited browser support (❌ flagged)
   - **false**: Not yet baseline (❌ flagged)

3. When you use a method that maps to a feature with non-"high" baseline status, the plugin reports an ESLint error.

## Configuration Options

Currently, the rule has no configuration options. It uses a fixed mapping of JavaScript methods to web-features identifiers.

## Contributing

To add support for more JavaScript features:

1. Update the `featureMap` in `lib/rules/no-non-baseline-features.js`
2. Add corresponding test cases in `tests/lib/rules/no-non-baseline-features.js`
3. Run tests with `npm test`

## License

MIT

## Related Projects

- [web-features](https://github.com/web-platform-dx/web-features) - The dataset powering this plugin
- [Baseline](https://web.dev/baseline/) - Learn more about web platform baseline