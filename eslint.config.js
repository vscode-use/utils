// @ts-check
const antfu = require('@antfu/eslint-config').default

module.exports = antfu(
  {
    ignores: [
      // eslint ignore globs here
      'test/**/*',
    ],
  },
  {
    rules: {
      // overrides
      'no-irregular-whitespace': 'off',
    },
  },
)
