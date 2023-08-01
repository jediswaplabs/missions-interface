import { create } from '@storybook/theming';

const themeOptions = {
  base: 'dark',
  brandTitle: 'Missions by JediSwap Storybook',
};
const customTheme = create(themeOptions);

export default customTheme;
