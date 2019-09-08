import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import ReactSVG from "react-svg";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import {
  Content,
  SearchButton,
  SearchContainer,
  SearchInput,
  SearchCatButton,
  SearchCatButtonList,
  SearchCat,
  StyledNavigation,
  LogoContainer,
  Login
} from "./styleNavigation";
import Logo from "../Abstracts/Logo";
import CollapseIcon from "../Abstracts/CollapseIcon";
import { getUsersRequest } from "../../API/users";
import { getItemsRequest } from "../../API/items";
import { searchStore, history } from "../../app";
import Menu from "./Menu/Menu";
import { IUserStore } from "../../store/user";

export interface IProps {
  userStore?: IUserStore;
}

const Navigation = ({ userStore }: IProps) => {
  const isAuth = userStore.isAuth;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCat, setSearchCat] = useState("Przedmioty");
  const [searchCatListVisible, setSearchCatListVisible] = useState(false);
  const [closeSubmenuRequest, setCloseSubmenuRequest] = useState(false);
  const searchCatRef = useRef();
  const userMenuRef = useRef();
  const messagesMenuRef = useRef();
  const notificationsMenuRef = useRef();

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
        searched = await getItemsRequest([
          { name: "name", selectedFilters: [searchQuery] }
        ]);
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

  useEffect(() => {
    const clickLisiner = (e: Event) => {
      const refs = [userMenuRef, messagesMenuRef, notificationsMenuRef];
      if (!searchCatRef.current.contains(e.target)) {
        setSearchCatListVisible(false);
      }
      if (
        isAuth
          ? refs.every(ref => {
              return !ref.current || !ref.current.contains(e.target);
            })
          : false
      ) {
        setCloseSubmenuRequest(true);
      }
    };
    window.addEventListener("click", clickLisiner);
    return () => {
      window.removeEventListener("click", clickLisiner);
    };
  }, [isAuth]);

  return (
    <StyledNavigation>
      <Content>
        <LogoContainer to="/">
          <Logo size="small" squareColor="light" />
        </LogoContainer>
        <SearchContainer>
          <SearchCat ref={searchCatRef}>
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
        {!isAuth ? (
          <Login to="/login">Zaloguj się</Login>
        ) : (
          <Menu
            userMenuRef={userMenuRef}
            messagesMenuRef={messagesMenuRef}
            notificationsMenuRef={notificationsMenuRef}
            setCloseSubmenuRequest={setCloseSubmenuRequest}
            closeSubmenuRequest={closeSubmenuRequest}
          />
        )}
      </Content>
    </StyledNavigation>
  );
};
export default inject("userStore")(observer(Navigation));
