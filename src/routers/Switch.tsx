import React from "react";
import { Switch } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import Login from "../components/Login/Login";
import Route from "./Route";
import CreateItem from "../components/CreateItem/CreateItem";
import ForeignProfile from "../components/Profile/ForeignProfile";
import OwnProfile from "../components/Profile/OwnProfile";
import EditItem from "../components/CreateItem/EditItem";
import SearchItems from "../components/Search/SearchItems/SearchItems";
import SearchUsers from "../components/Search/SearchUsers/SearchUsers";
import Messenger from "../components/Messenger/Messenger";
import ItemContainer from "../components/Item/ItemContainer";
import Notifications from "../components/Notifications/Notifications";

interface IProps {
  isAuth: boolean;
}

export default ({ isAuth }: IProps) => (
  <Switch>
    <Route
      displayFooter={true}
      type="both"
      path="/"
      exact
      component={Dashboard}
    />
    <Route
      displayFooter={true}
      type="private"
      path="/notifications"
      isAuth={isAuth}
      component={Notifications}
    />
    <Route
      displayFooter={false}
      type="private"
      path="/messenger/:id"
      isAuth={isAuth}
      component={Messenger}
    />
    <Route
      displayFooter={true}
      type="both"
      path="/search/items"
      component={SearchItems}
    />
    <Route
      displayFooter={true}
      type="both"
      path="/search/users"
      component={SearchUsers}
    />
    <Route
      displayFooter={true}
      type="private"
      path="/users/myProfile"
      isAuth={isAuth}
      component={OwnProfile}
      exact
    />
    <Route
      displayFooter={true}
      type="both"
      path="/users/:id"
      component={ForeignProfile}
    />
    <Route
      displayFooter={true}
      type="private"
      path="/items/create"
      isAuth={isAuth}
      component={CreateItem}
      exact
    />
    <Route
      displayFooter={true}
      type="private"
      path="/items/edit/:id"
      isAuth={isAuth}
      component={EditItem}
    />
    <Route
      displayFooter={true}
      type="both"
      path="/items/:id"
      component={ItemContainer}
    />
    <Route
      displayFooter={true}
      type="public"
      path="/login"
      isAuth={isAuth}
      component={Login}
    />
  </Switch>
);
