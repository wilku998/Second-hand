import "normalize.css";
import io from 'socket.io-client';
import * as React from "react";
import { render } from "react-dom";
import { ThemeProvider } from "styled-components";
import { createBrowserHistory } from "history";
import { Provider } from "mobx-react";
import theme from "./styles/theme";
import GlobalStyles from "./styles/GlobalStyles";
import AppRouter from "./routers/AppRouter";
import { getProfileRequest } from "./API/users";
import UserStore from "./store/user";
import ViewStore from "./store/view";
import SearchStore from "./store/search";
 
export const socket = io();

export const userStore = new UserStore();
export const viewStore = new ViewStore();
export const searchStore = new SearchStore();

const stores = {
  userStore,
  viewStore,
  searchStore
};

const start = async () => {
  await getProfileRequest();
  renderApp();
};

start();

export const history = createBrowserHistory();
const app = (
  <ThemeProvider theme={theme}>
    <Provider {...stores}>
      <div>
        <GlobalStyles />
        <AppRouter history={history} />
      </div>
    </Provider>
  </ThemeProvider>
);

const renderApp = () => render(app, document.getElementById("root"));
