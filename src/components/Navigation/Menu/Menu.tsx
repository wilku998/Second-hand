import React, { useState, useEffect } from "react";
import style from "./styleMenu";
import UserMenu from "./UserMenu/UserMenu";
import MessagesMenu from "./MessagesMenu/MessagesMenu";
import NotificationsMenu from "./NotificationsMenu/NotificationsMenu";
import { Login } from "../styleNavigation";
import MobileSearchButton from "./MobileSearchButton/MobileSearchButton";

export interface IProps {
  className?: string;
  userMenuRef: any;
  messagesMenuRef: any;
  notificationsMenuRef: any;
  mobileSearchButtonRef: any;
  closeSubmenuRequest: boolean;
  setCloseSubmenuRequest: (boolean: boolean) => void;
  onMobileSearchClick: () => void;
  isAuth: boolean;
  mobileSearchVisible: boolean;
}

const Menu = ({
  className,
  userMenuRef,
  messagesMenuRef,
  notificationsMenuRef,
  closeSubmenuRequest,
  setCloseSubmenuRequest,
  mobileSearchButtonRef,
  onMobileSearchClick,
  mobileSearchVisible,
  isAuth
}: IProps) => {
  const [visibleSubMenu, setVisibleSubMenu]: [
    "userMenu" | "messagesMenu" | "notificationsMenu",
    any
  ] = useState(undefined);

  const closeMenu = () => setVisibleSubMenu(undefined);
  const openMenu = (menu: "userMenu" | "messagesMenu" | "notificationsMenu") =>
    setVisibleSubMenu(menu);

  useEffect(() => {
    if (closeSubmenuRequest) {
      setVisibleSubMenu(undefined);
      setCloseSubmenuRequest(false);
    }
  }, [closeSubmenuRequest]);

  return (
    <ul className={className}>
      <MobileSearchButton
        ref={mobileSearchButtonRef}
        onMobileSearchClick={onMobileSearchClick}
        mobileSearchVisible={mobileSearchVisible}
      />
      {!isAuth ? (
        <Login to="/login">Zaloguj się</Login>
      ) : (
        <>
          <NotificationsMenu
            closeMenu={closeMenu}
            openMenu={openMenu}
            isVisible={visibleSubMenu === "notificationsMenu"}
            ref={notificationsMenuRef}
          />

          <MessagesMenu
            closeMenu={closeMenu}
            openMenu={openMenu}
            isVisible={visibleSubMenu === "messagesMenu"}
            ref={messagesMenuRef}
          />

          <UserMenu
            closeMenu={closeMenu}
            openMenu={openMenu}
            isVisible={visibleSubMenu === "userMenu"}
            ref={userMenuRef}
          />
        </>
      )}
    </ul>
  );
};

export default style(Menu);
