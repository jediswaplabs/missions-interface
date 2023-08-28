/* eslint-disable import/no-extraneous-dependencies */
const babelJest = require('babel-jest');

module.exports = babelJest.default.createTransformer({
  presets: [
    ['@babel/preset-react', { runtime: 'automatic' }],
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: '3.25',
        targets: {
          node: true,
        },
      },
    ],
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-optional-chaining',
    'babel-plugin-styled-components',
    'macros',
    '@babel/plugin-transform-react-jsx',
    // 'babel-plugin-jsx-pragmatic',
  ],
});
