const allWebFeatures = require('web-features');

const features = allWebFeatures.features;

const featureMap = {
  'flat': 'array-flat',
  'flatMap': 'array-flat',
  'padStart': 'string-pad',
  'padEnd': 'string-pad',
  'toSorted': 'array-by-copy',
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
              context.report({
                node: node,
                messageId: 'noNonBaselineFeatures',
                data: {
                  feature: propertyName,
                  status: feature.status.baseline,
                }
              });
            }
          }
        }
      },
    };
  },
};