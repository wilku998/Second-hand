import React from "react";
import { Route, Redirect } from "react-router";

export default ({
  component: Component,
  isAuth,
  path
}: {
  component: any;
  isAuth: boolean;
  path: string;
}) => (
  <Route
    path={path}
    component={(props: any) =>
      !isAuth ? <Redirect to="/login" /> : <Component {...props} />
    }
  />
);
