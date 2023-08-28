import React from 'react';
import { createRoot } from 'react-dom/client';
import './app/i18next';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { StarknetConfig, InjectedConnector } from '@starknet-react/core';

import { jediSwapDarkTheme } from './resources/themes';
import setupStore from './app/store';
import GlobalStyle, { ApplicationContainer } from './index.styles';
import MainPage from './pages/MainPage/MainPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import QuestPage from './pages/QuestPage/QuestPage';

if (module?.hot) {
  module.hot.accept();
}

const connectors = [
  new InjectedConnector({ options: { id: 'braavos' } }),
  new InjectedConnector({ options: { id: 'argentX' } }),
];

const App = () => (
  <ThemeProvider theme={jediSwapDarkTheme}>
    <StarknetConfig connectors={connectors} autoConnect>
      <Provider store={setupStore()}>
        <GlobalStyle />
        <ApplicationContainer>
          <BrowserRouter>
            <Switch>
              <Route path="/home">
                <MainPage />
              </Route>
              <Route path="/profile">
                <ProfilePage />
              </Route>

              <Route path="/quest/:id">
                <QuestPage />
              </Route>

              <Redirect to="/home" />
            </Switch>
          </BrowserRouter>
        </ApplicationContainer>
      </Provider>
    </StarknetConfig>
  </ThemeProvider>
);

createRoot(document.getElementById('app')).render(<App />);
