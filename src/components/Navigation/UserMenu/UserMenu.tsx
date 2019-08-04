import React, { useState, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Avatar from "../../Abstracts/Avatar";
import { logoutRequest } from "../../../API/users";
import style, { Label, List, CollapseIcon } from "./styleUserMenu";
import InvisibleButton from "../../Abstracts/InvisibleButton";

export interface IProps {
  className?: string;
  userStore: any;
}

const UserMenu = ({ userStore, className }: IProps) => {
  const { user } = userStore;
  const componentRef = useRef();
  const [listVisible, setListVisible] = useState(false);
  const [listWidth, setListWidth] = useState(0);
  const onLabelClick = () => setListVisible(!listVisible);

  useLayoutEffect(() => {
    setListWidth(componentRef.current.clientWidth);
  }, []);

  return (
    <div ref={componentRef} className={className}>
      <Label onClick={onLabelClick}>
        <Avatar src={user.avatar} size="small" />
        <span>{user.name}</span>
        <CollapseIcon
          listvisible={listVisible.toString()}
          src="/svg/left.svg"
        />
        {listVisible && (
          <List width={listWidth}>
            <li>
              <Link to="/users/myProfile">Twój profil</Link>
            </li>
            <li>Wiadomości</li>
            <li>
              <Link to="/items/create">Dodaj przedmiot</Link>
            </li>
            <li>
              <InvisibleButton onClick={logoutRequest}>
                Wyloguj się
              </InvisibleButton>
            </li>
          </List>
        )}
      </Label>
    </div>
  );
};

export default style(UserMenu);
