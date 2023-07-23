import { addons } from '@storybook/addons';
import customTheme from './customTheme';

const setConfigOptions = {
  theme: customTheme,
};
addons.setConfig(setConfigOptions);
