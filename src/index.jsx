import React from "react";
import { createRoot } from "react-dom/client";
import "./app/i18next";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import {
  Route,
  BrowserRouter,
  Switch,
  Redirect,
  HashRouter,
} from "react-router-dom";
import { StarknetConfig, InjectedConnector } from "@starknet-react/core";

import { jediSwapDarkTheme } from "./resources/themes";
import setupStore from "./app/store";
import GlobalStyle, { ApplicationContainer } from "./index.styles";
import MainPage from "./pages/MainPage/MainPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import QuestPage from "./pages/QuestPage/QuestPage";

if (module?.hot) {
  module.hot.accept();
}

const connectors = [
  new InjectedConnector({ options: { id: "braavos" } }),
  new InjectedConnector({ options: { id: "argentX" } }),
];

const App = () => (
  <ThemeProvider theme={jediSwapDarkTheme}>
    <StarknetConfig connectors={connectors} autoConnect>
      <Provider store={setupStore()}>
        <GlobalStyle />
        <ApplicationContainer>
          <HashRouter>
            <Switch>
              <Route exact strict path="/" component={MainPage} />
              <Route exact strict path="/profile" component={ProfilePage} />
              <Route exact strict path="/mission" component={QuestPage} />
              <Redirect to="/" />
            </Switch>
          </HashRouter>
        </ApplicationContainer>
      </Provider>
    </StarknetConfig>
  </ThemeProvider>
);

createRoot(document.getElementById("app")).render(<App />);
