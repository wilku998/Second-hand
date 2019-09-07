import React, { useState, useEffect } from "react";
import style, { MenuItem } from "./styleMenu";
import UserMenu from "./UserMenu/UserMenu";
import MessagesMenu from "./MessagesMenu/MessagesMenu";
import NotificationsMenu from "./NotificationsMenu/NotificationsMenu";

export interface IProps {
  className?: string;
  userMenuRef: any
  messagesMenuRef: any
  notificationsMenuRef: any
  closeSubmenuRequest: boolean;
  setCloseSubmenuRequest: (boolean: boolean) => void;
}

const Menu = ({ className, userMenuRef, messagesMenuRef, notificationsMenuRef, closeSubmenuRequest, setCloseSubmenuRequest }: IProps) => {
  const [visibleSubMenu, setVisibleSubMenu]: [
    "userMenu" | "messagesMenu" | "notificationsMenu",
    any
  ] = useState(undefined);

  const closeMenu = () => setVisibleSubMenu(undefined);
  const openMenu = (menu: "userMenu" | "messagesMenu" | "notificationsMenu") =>
    setVisibleSubMenu(menu);

    useEffect(() => {
      if(closeSubmenuRequest){
        setVisibleSubMenu(undefined);
        setCloseSubmenuRequest(false);
      }
    }, [closeSubmenuRequest]);

  return (
    <ul className={className}>
      <MenuItem>
        <NotificationsMenu
          closeMenu={closeMenu}
          openMenu={openMenu}
          isVisible={visibleSubMenu === "notificationsMenu"}
          ref={notificationsMenuRef}
        />
      </MenuItem>
      <MenuItem>
        <MessagesMenu
          closeMenu={closeMenu}
          openMenu={openMenu}
          isVisible={visibleSubMenu === "messagesMenu"}
          ref={messagesMenuRef}
        />
      </MenuItem>
      <MenuItem>
        <UserMenu
          closeMenu={closeMenu}
          openMenu={openMenu}
          isVisible={visibleSubMenu === "userMenu"}
          ref={userMenuRef}
        />
      </MenuItem>
    </ul>
  );
};

export default style(Menu);
