import "normalize.css";
import * as React from "react";
import { render } from "react-dom";
import { ThemeProvider } from "styled-components";
import { createBrowserHistory } from "history";
import { Provider } from "mobx-react";
import MobxReactDevtools from "mobx-react-devtools";
import theme from "./styledComponents/theme";
import GlobalStyles from "./styledComponents/GlobalStyles";
import AppRouter from "./routers/AppRouter";
import { getProfileRequest } from "./API/users";
import UserStore from "./store/user";
import ViewStore from "./store/view";

export const userStore = new UserStore();
export const viewStore = new ViewStore();

const stores = {
  userStore,
  viewStore
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
