import React from "react";
import ReactSVG from "react-svg";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { history } from "../../app";
import { logoutRequest } from "../../API/users";

import style, {
  Menu,
  SearchButton,
  SearchContainer,
  SearchInput
} from "./styleNavigation";
import Logo from "../Abstracts/Logo";

export interface IProps {
  className?: string;
  userStore: any;
}

const Navigation = ({ className, userStore }: IProps) => {
  const isAuth = userStore.isAuth;
  const onLoginClick = async () => {
    if (isAuth) {
      await logoutRequest();
      userStore.user = undefined;
    } else {
      history.push("/login");
    }
  };
  return (
    <nav className={className}>
      <Link to="/">
        <Logo size="small" squareColor="light" />
      </Link>
      <SearchContainer>
        <SearchInput type="text" placeholder="Szukaj przedmiotów" />
        <SearchButton>
          <ReactSVG src="./svg/search.svg" />
        </SearchButton>
      </SearchContainer>
      <Menu>
        <li>Kobiety</li>
        <li>Dzieci</li>
        <li>Mężczyźni</li>
        <li>
          <button onClick={onLoginClick}>
            {isAuth ? "Wyloguj" : "Zaloguj"} się
          </button>
        </li>
      </Menu>
    </nav>
  );
};

export default style(inject("userStore")(observer(Navigation)));
