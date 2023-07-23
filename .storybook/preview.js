import React, { Suspense,useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import {ThemeProvider} from '@mui/material/styles';
import {initialize, mswDecorator} from 'msw-storybook-addon';
import { MemoryRouter } from "react-router-dom";

import {jediSwapDarkTheme} from '../src/resources/themes';
import i18n from '../src/app/i18next';
import { configure } from '@storybook/testing-library';
configure({asyncUtilTimeout: 2000});

initialize();

// https://github.com/mswjs/msw-storybook-addon
export const decorators = [
  mswDecorator,
  (Story) => (
    <MemoryRouter initialEntries={['/']}>{<Story />}</MemoryRouter>
  ),
  (Story) => (
    <ThemeProvider theme={jediSwapDarkTheme}>{<Story />}</ThemeProvider>
  ),
  (Story, context) => {
    const { locale } = context.globals;

    // When the locale global changes
    // Set the new locale in i18n
    useEffect(() => {
      i18n.changeLanguage(locale);
    }, [locale]);

    return (
      <Suspense fallback={<div>loading translations...</div>}>
        <I18nextProvider i18n={i18n}>
          <Story />
        </I18nextProvider>
      </Suspense>
    );
  }
];

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', title: 'English', left: '🇺🇸' },
        { value: 'hi', title: 'Hindi', left: '🇮🇳' },
      ],
      showName: true,
    },
  },
};

export const parameters = {
  actions: {argTypesRegex: "^on[A-Z].*"},
  i18n,
  locale: 'en',
  backgrounds: {
    default: 'dark',
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  msw: {
    handlers: {}
  }
};
