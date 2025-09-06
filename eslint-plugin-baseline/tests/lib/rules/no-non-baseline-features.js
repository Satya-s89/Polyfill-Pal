const { RuleTester } = require("eslint");
const rule = require("../../../lib/rules/no-non-baseline-features");

const ruleTester = new RuleTester();

ruleTester.run("baseline/no-non-baseline-features", rule, {
  valid: [
    {
      code: "const x = Object.keys({ a: 1 });",
      languageOptions: { ecmaVersion: 2020, sourceType: "module" },
    },
    {
      code: "const str = 'hello'.padStart(10);",
      languageOptions: { ecmaVersion: 2020, sourceType: "module" },
    },
  ],
  invalid: [
    {
      code: "const arr = [1, 2, 3]; const sortedArr = arr.toSorted();",
      languageOptions: { ecmaVersion: 2020, sourceType: "module" },
      errors: [
        {
          messageId: "noNonBaselineFeatures",
        },
      ],
    },
  ],
});