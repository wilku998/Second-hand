import React from "react";
import { Route, Redirect } from "react-router";

export default ({
  component: Component,
  isAuth,
  path,
  type,
  exact
}: {
  component: any;
  isAuth?: boolean;
  path: string;
  type: "public" | "private" | "both";
  exact?: boolean;
}) => {
  let shoudRender = true;
  switch (type) {
    case "public":
      shoudRender = !isAuth;
      break;
    case "private":
      shoudRender = isAuth;
      break;
  }

  window.scrollTo({ top: 0 });

  return (
    <Route
      exact={exact}
      path={path}
      component={(props: any) =>
        shoudRender ? (
          <Component {...props} />
        ) : (
          <Redirect to={type === "private" ? "/login" : "/"} />
        )
      }
    />
  );
};
