// Valid code - these features have high baseline support
const obj = { a: 1, b: 2 };
const keys = Object.keys(obj);
const str = 'hello'.padStart(10, '0');

// Invalid code - these features have low baseline support
const arr = [3, 1, 2];
const sorted = arr.toSorted(); // Should trigger error