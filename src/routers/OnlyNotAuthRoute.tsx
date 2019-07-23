import React from "react";
import { Route, Redirect } from "react-router";
import { inject, observer } from "mobx-react";

const OnlyNotAuthRoute = ({
  component: Component,
  userStore,
  ...rest
}: any) => {
    console.log(userStore.isAuth)
  return (
    <Route
      {...rest}
      component={(props: any) =>
        userStore.isAuth ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default inject("userStore")(observer(OnlyNotAuthRoute));
