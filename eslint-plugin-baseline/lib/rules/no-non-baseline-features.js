const allWebFeatures = require('web-features');

const features = allWebFeatures.features;

const featureMap = {
  'flat': 'array-flat',
  'flatMap': 'array-flat',
  'padStart': 'string-pad',
  'padEnd': 'string-pad',
  'toSorted': 'array-by-copy',
  'toReversed': 'array-by-copy',
  'toSpliced': 'array-by-copy',
  'with': 'array-by-copy',
};

const fixSuggestions = {
  'toSorted': (node) => `[...${node.callee.object.name}].sort()`,
  'toReversed': (node) => `[...${node.callee.object.name}].reverse()`,
  'toSpliced': (node) => {
    const args = node.arguments.map(arg => arg.raw || arg.name).join(', ');
    return `${node.callee.object.name}.slice().splice(${args})`;
  },
  'with': (node) => {
    const [index, value] = node.arguments;
    return `${node.callee.object.name}.map((item, i) => i === ${index.raw || index.name} ? ${value.raw || value.name} : item)`;
  },
};

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallows the use of non-Baseline 'Widely available' features.",
      recommended: false,
      url: "https://github.com/your-username/eslint-plugin-baseline#no-non-baseline-features"
    },
    messages: {
      noNonBaselineFeatures: "The '{{feature}}' method is not a Baseline 'Widely available' feature. Current support: {{status}}."
    },
    schema: [],
    fixable: "code",
  },
  create(context) {
    return {
      CallExpression(node) {
        if (node.callee.type === 'MemberExpression') {
          const propertyName = node.callee.property.name;
          const featureId = featureMap[propertyName];

          if (featureId) {
            const feature = features[featureId];

            if (feature && feature.status.baseline !== 'high') {
              const report = {
                node: node,
                messageId: 'noNonBaselineFeatures',
                data: {
                  feature: propertyName,
                  status: feature.status.baseline,
                }
              };

              if (fixSuggestions[propertyName]) {
                report.fix = function(fixer) {
                  const replacement = fixSuggestions[propertyName](node);
                  return fixer.replaceText(node, replacement);
                };
              }

              context.report(report);
            }
          }
        }
      },
    };
  },
};