import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { inject, observer } from "mobx-react";
import Dashboard from "../components/Dashboard/Dashboard";
import Login from "../components/Login/Login";
import Navigation from "../components/Navigation/Navigation";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Item from "../components/Item/Item";
import CreateItem from "../components/Item/CreateItem/CreateItem";
import Profile from "../components/Profile/Profile";

interface IProps {
  history: any;
  userStore: any;
}

const AppRouter = ({ history, userStore }: IProps) => {
  const isAuth = userStore.isAuth;
  return (
    <Router history={history}>
      <Navigation userStore={userStore} />
      <Switch>
      <Route path="/" exact component={Dashboard} />
        <Route path="/users/:id" component={Profile} />
        <PrivateRoute path="/items/create" isAuth={isAuth} component={CreateItem} />
        <Route path="/items/:id" component={Item} />
        <PublicRoute path="/login" isAuth={isAuth} component={Login} />
      </Switch>
    </Router>
  );
};

export default inject("userStore")(observer(AppRouter));
