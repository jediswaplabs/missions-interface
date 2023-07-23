const { inspect } = require('util');

module.exports = async ({ config }) => {
  config.resolve.fallback.utils = require.resolve('util/');
  config.plugins = config.plugins.filter((p) => !inspect(p).match(/^ESLintWebpackPlugin/))

  const fileLoaderRule = config.module.rules.find(
    (rule) => !Array.isArray(rule.test) && rule.test.test(".svg"),
  );
  fileLoaderRule.exclude = /\.svg$/;
  config.module.rules.push({
    test: /\.svg$/,
    use: ["@svgr/webpack", "url-loader"],
  });

  return config;
}
