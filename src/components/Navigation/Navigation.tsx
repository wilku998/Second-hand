import React from "react";
import ReactSVG from "react-svg";
import { Link } from "react-router-dom";

import style, {
  Content,
  Menu,
  SearchButton,
  SearchContainer,
  SearchInput
} from "./styleNavigation";
import Logo from "../Abstracts/Logo";
import UserMenu from "./UserMenu/UserMenu";
import { IUserStore } from "../../store/user";

export interface IProps {
  className?: string;
  userStore: IUserStore;
}

const Navigation = ({ className, userStore }: IProps) => {
  const isAuth = userStore.isAuth;
  return (
    <nav className={className}>
      <Content>
        <Link to="/">
          <Logo size="small" squareColor="light" />
        </Link>
        <SearchContainer>
          <SearchInput type="text" placeholder="Szukaj przedmiotów" />
          <SearchButton>
            <ReactSVG src="/svg/search.svg" />
          </SearchButton>
        </SearchContainer>
        <Menu>
          <li>Kobiety</li>
          <li>Dzieci</li>
          <li>Mężczyźni</li>
          <li>
            {!isAuth ? (
              <Link to="/login">Zaloguj się</Link>
            ) : (
              <UserMenu userStore={userStore} />
            )}
          </li>
        </Menu>
      </Content>
    </nav>
  );
};

export default style(Navigation);
