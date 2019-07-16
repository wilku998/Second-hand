import "normalize.css";
import * as React from "react";
import { render } from "react-dom";
import { ThemeProvider } from "styled-components";
import Navigation from "./components/Navigation/Navigation";
import theme from "./styledComponents/theme";
import GlobalStyles from "./styledComponents/GlobalStyles";

const app = (
  <ThemeProvider theme={theme}>
    <div>
      <GlobalStyles />
      <Navigation />
    </div>
  </ThemeProvider>
);

render(app, document.getElementById("root"));
