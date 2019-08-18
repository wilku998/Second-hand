import React, { useState, ChangeEvent } from "react";
import ReactSVG from "react-svg";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import {
  Content,
  Menu,
  SearchButton,
  SearchContainer,
  SearchInput,
  SearchCatButton,
  SearchCatButtonList,
  SearchCat,
  StyledNavigation
} from "./styleNavigation";
import Logo from "../Abstracts/Logo";
import UserMenu from "./UserMenu/UserMenu";
import { IUserStore } from "../../store/user";
import CollapseIcon from "../Abstracts/CollapseIcon";
import { getUsersRequest } from "../../API/users";
import { getItemsRequest } from "../../API/items";
import { searchStore, history } from "../../app";

export interface IProps {
  userStore?: IUserStore;
}

const Navigation = ({ userStore }: IProps) => {
  const isAuth = userStore.isAuth;
  const user = userStore.getUser;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCat, setSearchCat] = useState("Przedmioty");
  const [searchCatListVisible, setSearchCatListVisible] = useState(false);

  const onCatChange = (e: any) => {
    const { name } = e.target;
    setSearchCat(name);
    setSearchCatListVisible(false);
  };

  const onSearchCatButtonClick = () => {
    setSearchCatListVisible(!searchCatListVisible);
  };

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);
  };

  const searchAction = async () => {
    let searched;
    switch (searchCat) {
      case "Przedmioty":
        searched = await getItemsRequest([{name: "name", selectedFilters: [searchQuery]}]);
        searchStore.searchedItems = searched;
        history.push("/search/items");
        break;
      case "Użytkownicy":
        searched = await getUsersRequest(searchQuery);
        searchStore.searchedUsers = searched;
        history.push("/search/users");
        break;
    }
  };

  return (
    <StyledNavigation>
      <Content>
        <Link to="/">
          <Logo size="small" squareColor="light" />
        </Link>
        <SearchContainer>
          <SearchCat>
            <SearchCatButton onClick={onSearchCatButtonClick}>
              <span>{searchCat}</span>
              <CollapseIcon
                listvisible={searchCatListVisible.toString()}
                width=".7rem"
              />
            </SearchCatButton>
            {searchCatListVisible && (
              <SearchCatButtonList>
                <li onClick={onCatChange}>
                  {searchCat === "Przedmioty" ? (
                    <button name="Użytkownicy" onClick={onCatChange}>
                      Użytkownicy
                    </button>
                  ) : (
                    <button name="Przedmioty" onClick={onCatChange}>
                      Przedmioty
                    </button>
                  )}
                </li>
              </SearchCatButtonList>
            )}
          </SearchCat>

          <SearchInput
            onChange={onSearchInputChange}
            type="text"
            placeholder="Szukaj przedmiotów"
            value={searchQuery}
          />
          <SearchButton onClick={searchAction}>
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
              <UserMenu user={user} />
            )}
          </li>
        </Menu>
      </Content>
    </StyledNavigation>
  );
};

export default inject("userStore")(observer(Navigation));
