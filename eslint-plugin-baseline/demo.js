// A good example that should pass your linter.
// Object.keys() is a Baseline 'high' feature.
const obj = { name: "POLYFILL_PAL" };
const keys = Object.keys(obj);

// A bad example that should be flagged by your linter.
// Array.prototype.toSorted() is a Baseline 'low' feature.
const arr = [1, 2, 3];
const sortedArr = arr.toSorted();