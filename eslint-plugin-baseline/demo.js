// Valid code - these features have high baseline support
const obj = { a: 1, b: 2 };
const keys = Object.keys(obj);
const str = 'hello'.padStart(10, '0');

// Invalid code - these features have low baseline support
const arr = [3, 1, 2];
const sorted = [...arr].sort(); // Should be fixed to [...arr].sort()
const reversed = [...arr].reverse(); // Should be fixed to [...arr].reverse()
const spliced = arr.slice().splice(1, 1, 'new'); // Should be fixed to arr.slice().splice(1, 1, 'new')
const modified = arr.map((item, i) => i === 0 ? 'first' : item); // Should be fixed to arr.map((item, i) => i === 0 ? 'first' : item)