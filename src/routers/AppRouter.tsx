import React from "react";
import { inject, observer } from "mobx-react";
import { Router } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import EditProfile from "../components/popups/EditProfile/EditProfile";
import RemoveProfile from "../components/popups/RemoveProfile/RemoveProfile";
import Gallery from "../components/Gallery/Gallery";
import Footer from "../components/Footer/Footer";
import Switch from './Switch';

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
      <Switch isAuth={isAuth} />
      <Footer />
    </Router>
  );
};

export default inject("userStore")(observer(AppRouter));
