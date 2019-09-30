import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../../Abstracts/Avatar";
import { logoutRequest } from "../../../../API/users";
import { UserMenuContent, UserName, UserMenuList, UserMenuButton } from "./styleUserMenu";
import { viewStore } from "../../../../app";
import {
  SubMenuListItem,
} from "../styleMenu";
import { IUserStore } from "../../../../store/user";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import CollapseIcon from "../../../Abstracts/CollapseIcon";
import InvisibleButton from "../../../Abstracts/InvisibleButton";

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
      <UserMenuContent
        isselected={isVisible.toString()}
        onClick={onClick}
        ref={ref}
      >
        <Avatar src={user.avatar} size="small" />
        <UserName>{user.name}</UserName>
        <UserMenuButton>
          <CollapseIcon width="1rem" listvisible={isVisible.toString()} />
        </UserMenuButton>
        {isVisible && (
          <UserMenuList>
            <SubMenuListItem>
              <Link to="/users/myProfile">Twój profil</Link>
            </SubMenuListItem>
            <SubMenuListItem>
              <Link to="/items/create">Dodaj przedmiot</Link>
            </SubMenuListItem>
            <SubMenuListItem>
              <InvisibleButton onClick={viewStore.toggleEditProfile}>
                Edytuj profil
              </InvisibleButton>
            </SubMenuListItem>
            <SubMenuListItem>
              <InvisibleButton onClick={viewStore.toggleRemoveProfile}>
                Usuń profil
              </InvisibleButton>
            </SubMenuListItem>
            <SubMenuListItem>
              <InvisibleButton onClick={logoutRequest}>
                Wyloguj się
              </InvisibleButton>
            </SubMenuListItem>
          </UserMenuList>
        )}
      </UserMenuContent>
    );
  },
  { forwardRef: true }
);

export default inject("userStore")(UserMenu);
