const Mocha = require('mocha');
const path = require('path');

const mocha = new Mocha();

mocha.addFile(path.resolve(__dirname, 'tests/lib/rules/no-non-baseline-features.js'));

mocha.run(function(failures) {
  process.exitCode = failures ? 1 : 0;
});