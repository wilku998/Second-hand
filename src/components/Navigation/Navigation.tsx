import React from "react";
import ReactSVG from "react-svg";
import style, {
  Menu,
  SearchButton,
  SearchContainer,
  SearchInput
} from "./styleNavigation";
import Logo from "../Abstracts/Logo";

export interface IProps {
  className: string;
}

const Navigation = ({ className }: IProps) => {
  return (
    <nav className={className}>
      <Logo size="small" squareColor='light' />
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
        <li>Zaloguj się</li>
        <li>Zarejestruj się</li>
      </Menu>
    </nav>
  );
};

export default style(Navigation);
