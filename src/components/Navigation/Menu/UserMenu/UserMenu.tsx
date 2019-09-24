import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../../Abstracts/Avatar";
import { logoutRequest } from "../../../../API/users";
import { Label, UserName } from "./styleUserMenu";
import CollapseIcon from "../../../Abstracts/CollapseIcon";
import { viewStore } from "../../../../app";
import { SubMenuList, SubMenuListButton, SubMenu } from "../styleMenu";
import { IUserStore } from "../../../../store/user";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";

export interface IProps {
  userStore?: IUserStore;
  isVisible: boolean;
  closeMenu: () => void;
  openMenu: (menu: "userMenu" | "messagesMenu" | "notificationsMenu") => void;
}
const UserMenu = observer(
  ({ isVisible, closeMenu, openMenu, userStore }: IProps, ref) => {
    const user = userStore.getUser;
    const onClick = () => {
      if (isVisible) {
        closeMenu();
      } else {
        openMenu("userMenu");
      }
    };
    return (
      <SubMenu onClick={onClick} ref={ref}>
        <Label>
          <Avatar src={user.avatar} size="small" />
          <UserName>{user.name}</UserName>
          <CollapseIcon width="1rem" listvisible={isVisible.toString()} />
          {isVisible && (
            <SubMenuList>
              <li>
                <SubMenuListButton as={Link} to="/users/myProfile">
                  Twój profil
                </SubMenuListButton>
              </li>
              <li>
                <SubMenuListButton as={Link} to="/items/create">
                  Dodaj przedmiot
                </SubMenuListButton>
              </li>
              <li>
                <SubMenuListButton onClick={viewStore.toggleEditProfile}>
                  Edytuj profil
                </SubMenuListButton>
              </li>
              <li>
                <SubMenuListButton onClick={viewStore.toggleRemoveProfile}>
                  Usuń profil
                </SubMenuListButton>
              </li>
              <li>
                <SubMenuListButton onClick={logoutRequest}>
                  Wyloguj się
                </SubMenuListButton>
              </li>
            </SubMenuList>
          )}
        </Label>
      </SubMenu>
    );
  },
  { forwardRef: true }
);

export default inject("userStore")(UserMenu);
