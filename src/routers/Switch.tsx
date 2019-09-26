import React, { useEffect } from "react";
import { Switch } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import Login from "../components/Login/Login";
import Route from "./Route";
import Item from "../components/Item/Item";
import CreateItem from "../components/CreateItem/CreateItem";
import ForeignProfile from "../components/Profile/ForeignProfile";
import OwnProfile from "../components/Profile/OwnProfile";
import EditItem from "../components/CreateItem/EditItem";
import SearchItems from "../components/Search/SearchItems/SearchItems";
import SearchUsers from "../components/Search/SearchUsers/SearchUsers";
import Messenger from "../components/Messenger/Messenger";
import { history } from "../app";

interface IProps {
  isAuth: boolean;
}

export default ({ isAuth }: IProps) => {
  useEffect(() => {
    console.log("siwtc");
  }, [history.location.pathname]);

  return (
    <Switch>
      <Route type="both" path="/" exact component={Dashboard} />
      <Route type="both" path="/search/items" component={SearchItems} />
      <Route type="both" path="/search/users" component={SearchUsers} />
      <Route
        type="private"
        path="/messenger/:id"
        isAuth={isAuth}
        component={Messenger}
      />
      <Route
        type="private"
        path="/messenger"
        isAuth={isAuth}
        component={Messenger}
      />
      <Route
        type="private"
        path="/users/myProfile"
        isAuth={isAuth}
        component={OwnProfile}
      />
      <Route type="both" path="/users/:id" component={ForeignProfile} />
      <Route
        type="private"
        path="/items/create"
        isAuth={isAuth}
        component={CreateItem}
      />
      <Route
        type="private"
        path="/items/edit/:id"
        isAuth={isAuth}
        component={EditItem}
      />
      <Route type="both" path="/items/:id" component={Item} />
      <Route type="public" path="/login" isAuth={isAuth} component={Login} />
    </Switch>
  );
};
