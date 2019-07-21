import React from "react";
import ReactSVG from "react-svg";
import { NavLink, Link } from "react-router-dom";
import style, {
  Menu,
  SearchButton,
  SearchContainer,
  SearchInput
} from "./styleNavigation";
import Logo from "../Abstracts/Logo";

export interface IProps {
  className?: string;
}

const Navigation = ({ className }: IProps) => {
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
          <Link to="/login">Zarejestruj / Zaloguj się</Link>
        </li>
      </Menu>
    </nav>
  );
};

export default style(Navigation);
