module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|mdx)'],
  features: {
    interactionsDebugger: true
  },
  babel: async options => {
    options.plugins.push('babel-plugin-inline-react-svg');
    return options;
  },
  core: {
    disableTelemetry: true, // 👈 Disables telemetry
  },
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-styling',
    '@storybook/addon-interactions',
    'storybook-react-i18next',
    'storybook-addon-manual-mocks'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  staticDirs: ['../public'],
  docs: {
    autodocs: false
  }
};
