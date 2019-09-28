import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../../Abstracts/Avatar";
import { logoutRequest } from "../../../../API/users";
import { UserMenuContent, UserName } from "./styleUserMenu";
import { viewStore } from "../../../../app";
import { SubMenuList, SubMenuListItem, SubMenuIconContainer } from "../styleMenu";
import { IUserStore } from "../../../../store/user";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import CollapseIcon from "../../../Abstracts/CollapseIcon";

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
      <UserMenuContent onClick={onClick} ref={ref}>
        <Avatar src={user.avatar} size="small" />
        <UserName>{user.name}</UserName>
        <SubMenuIconContainer isselected={isVisible.toString()}>
          <CollapseIcon width="1rem" listvisible={isVisible.toString()} />
        </SubMenuIconContainer>
        {isVisible && (
          <SubMenuList>
            <SubMenuListItem as={Link} to="/users/myProfile">
              Twój profil
            </SubMenuListItem>

            <SubMenuListItem as={Link} to="/items/create">
              Dodaj przedmiot
            </SubMenuListItem>

            <SubMenuListItem onClick={viewStore.toggleEditProfile}>
              Edytuj profil
            </SubMenuListItem>

            <SubMenuListItem onClick={viewStore.toggleRemoveProfile}>
              Usuń profil
            </SubMenuListItem>

            <SubMenuListItem onClick={logoutRequest}>
              Wyloguj się
            </SubMenuListItem>
          </SubMenuList>
        )}
      </UserMenuContent>
    );
  },
  { forwardRef: true }
);

export default inject("userStore")(UserMenu);
