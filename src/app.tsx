import "normalize.css";
import * as React from "react";
import { render } from "react-dom";
import { ThemeProvider } from "styled-components";
import { createBrowserHistory } from "history";
import theme from "./styledComponents/theme";
import GlobalStyles from "./styledComponents/GlobalStyles";
import AppRouter from "./routers/AppRouter";

const history = createBrowserHistory();

const app = (
  <ThemeProvider theme={theme}>
    <div>
      <GlobalStyles/>
      <AppRouter history={history} />
    </div>
  </ThemeProvider>
);

render(app, document.getElementById("root"));
