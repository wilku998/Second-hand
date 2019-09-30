import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import ReactSVG from "react-svg";
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
  Login,
  NavigationLogo,
  MobileSearchIcon
} from "./styleNavigation";
import { history } from "../../app";
import Menu from "./Menu/Menu";
import { IUserStore } from "../../store/user";
import { ButtonIcon, MenuItem } from "./Menu/styleMenu";
import CollapseIcon from "../Abstracts/CollapseIcon";

export interface IProps {
  userStore?: IUserStore;
}

const Navigation = ({ userStore }: IProps) => {
  const isAuth = userStore.isAuth;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCat, setSearchCat] = useState("Przedmioty");
  const [searchCatListVisible, setSearchCatListVisible] = useState(false);
  const [closeSubmenuRequest, setCloseSubmenuRequest] = useState(false);
  const [mobileSearchVisible, setMobileSearchVisible] = useState(false);
  const searchCatRef = useRef();
  const userMenuRef = useRef();
  const messagesMenuRef = useRef();
  const notificationsMenuRef = useRef();
  const mobileSearchRef = useRef();
  const mobileSearchButtonRef = useRef();

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
    switch (searchCat) {
      case "Przedmioty":
        history.push(`/search/items?name=${searchQuery}`);
        break;
      case "Użytkownicy":
        history.push(`/search/users?name=${searchQuery}`);
        break;
    }
  };

  const onMobileSearchClick = () =>
    setMobileSearchVisible(!mobileSearchVisible);

  useEffect(() => {
    const clickLisiner = (e: Event) => {
      const refs = [userMenuRef, messagesMenuRef, notificationsMenuRef];
      if (!searchCatRef.current.contains(e.target)) {
        setSearchCatListVisible(false);
      }
      if (
        !mobileSearchRef.current.contains(e.target) &&
        !mobileSearchButtonRef.current.contains(e.target)
      ) {
        setMobileSearchVisible(false);
      }
      if (isAuth) {
        if (
          refs.every(ref => {
            return !ref.current || !ref.current.contains(e.target);
          })
        ) {
          setCloseSubmenuRequest(true);
        } else {
          setMobileSearchVisible(false);
          setSearchCatListVisible(false);
        }
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
          <NavigationLogo />
        </LogoContainer>
        <SearchContainer
          ref={mobileSearchRef}
          mobileSearchVisible={mobileSearchVisible}
        >
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
        <Menu
          userMenuRef={userMenuRef}
          messagesMenuRef={messagesMenuRef}
          notificationsMenuRef={notificationsMenuRef}
          mobileSearchButtonRef={mobileSearchButtonRef}
          setCloseSubmenuRequest={setCloseSubmenuRequest}
          closeSubmenuRequest={closeSubmenuRequest}
          onMobileSearchClick={onMobileSearchClick}
          isAuth={isAuth}
          mobileSearchVisible={mobileSearchVisible}
        />
      </Content>
    </StyledNavigation>
  );
};
export default inject("userStore")(observer(Navigation));
