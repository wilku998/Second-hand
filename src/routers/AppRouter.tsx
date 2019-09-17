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
import ForeignProfile from "../components/Profile/ForeignProfile";
import OwnProfile from "../components/Profile/OwnProfile";
import EditItem from "../components/Item/CreateItem/EditItem";
import EditProfile from "../components/popups/EditProfile/EditProfile";
import SearchItems from "../components/Search/SearchItems/SearchItems";
import SearchUsers from "../components/Search/SearchUsers/SearchUsers";
import RemoveProfile from "../components/popups/RemoveProfile/RemoveProfile";
import Gallery from "../components/Gallery/Gallery";
import Messenger from "../components/Messenger/Messenger";
import Footer from "../components/Footer/Footer";

interface IProps {
  history: any;
  userStore?: any;
}

const AppRouter = ({ history, userStore }: IProps) => {
  const isAuth = userStore.isAuth;
  return (
    <Router history={history}>
      <Navigation />
      {isAuth && <EditProfile />}
      {isAuth && <RemoveProfile />}
      <Gallery />
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/search/items" component={SearchItems} />
        <Route path="/search/users" component={SearchUsers} />
        <PrivateRoute
          path="/messenger/:id"
          isAuth={isAuth}
          component={Messenger}
        />
        <PrivateRoute path="/messenger" isAuth={isAuth} component={Messenger} />
        <PrivateRoute
          path="/users/myProfile"
          isAuth={isAuth}
          component={OwnProfile}
        />
        <Route path="/users/:id" component={ForeignProfile} />
        <PrivateRoute
          path="/items/create"
          isAuth={isAuth}
          component={CreateItem}
        />
        <PrivateRoute
          path="/items/edit/:id"
          isAuth={isAuth}
          component={EditItem}
        />
        <Route path="/items/:id" component={Item} />
        <PublicRoute path="/login" isAuth={isAuth} component={Login} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default inject("userStore")(observer(AppRouter));
