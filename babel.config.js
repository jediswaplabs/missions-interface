module.exports = (api) => {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-react',
        { runtime: 'automatic' },
      ],
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry',
          corejs: '3.25',
        },
      ],
    ],
    plugins: [
      '@babel/plugin-transform-runtime',
      'babel-plugin-styled-components',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-transform-react-jsx',
    ],
  };
};
