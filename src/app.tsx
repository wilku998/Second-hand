import "normalize.css";
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
import InterlocutorsStore from "./store/interlocutors";
import media from "./styles/media";
export const userStore = new UserStore();
export const viewStore = new ViewStore();
export const interlocutorsStore = new InterlocutorsStore();
import "./socket";

const stores = {
  userStore,
  viewStore,
  interlocutorsStore
};

const start = async () => {
  await getProfileRequest();
  renderApp();
};

start();

const themeWithMedia = { ...theme, ...media };

export const history = createBrowserHistory();
const app = (
  <ThemeProvider theme={themeWithMedia}>
    <Provider {...stores}>
      <div>
        <GlobalStyles />
        <AppRouter history={history} />
      </div>
    </Provider>
  </ThemeProvider>
);

const renderApp = () => render(app, document.getElementById("root"));
