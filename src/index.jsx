import React from 'react';
import { createRoot } from 'react-dom/client';

import './app/i18next';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { StarknetReactProvider, createStarknetReactRoot } from '@web3-starknet-react/core';
import { Route, BrowserRouter, Switch, Redirect, Link } from 'react-router-dom';

import { NetworkContextName } from './common/contansts';
import getLibrary from './utils/getLibrary';
import { jediSwapDarkTheme } from './resources/themes';
import setupStore from './app/store';
import GlobalStyle, { ApplicationContainer } from './index.styles';
import MainPage from './pages/MainPage/MainPage';
import PersonalProfilePage from './pages/PersonalProfilePage/PersonalProfilePage';
import { isStarknetAddress } from './common/addressHelper';

const StarknetProviderNetwork = createStarknetReactRoot(NetworkContextName);

if (module?.hot) {
  module.hot.accept();
}

if (process.env.NODE_MOCK_BE) {
  // eslint-disable-next-line global-require
  const { worker } = require('../__mocks__/mockBe');
  worker.start();
}

const App = () => (
  <ThemeProvider theme={jediSwapDarkTheme}>
    <StarknetReactProvider getLibrary={getLibrary}>
      <StarknetProviderNetwork getLibrary={getLibrary}>
        <Provider store={setupStore()}>
          <GlobalStyle />
          <ApplicationContainer>
            <BrowserRouter>
              <Switch>
                <Route path="/home">
                  <MainPage />
                </Route>

                <Route exacts
                  strict
                  path="/account/:accountAddress"
                  render={({ match }) => {
                    if (isStarknetAddress(match.params.accountAddress.toLowerCase())) {
                      return (<PersonalProfilePage account={match.params.accountAddress.toLowerCase()} />);
                    }
                    return <Redirect to="/home" />;
                  }}
                />

                <Redirect to="/home" />
              </Switch>
            </BrowserRouter>
          </ApplicationContainer>
        </Provider>
      </StarknetProviderNetwork>
    </StarknetReactProvider>
  </ThemeProvider>
);

createRoot(document.getElementById('app')).render(<App />);
