import React from 'react';
import { Provider } from 'react-redux';

import setupStore from '../app/store';

export function renderWithProviders({ preloadedState = {}, store = setupStore(preloadedState) } = {}) {
  return ({ children }) => <Provider store={store}>{children}</Provider>;
}
