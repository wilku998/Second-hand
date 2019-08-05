import React from "react";
import { inject, observer } from "mobx-react";
import { UserLabel, Button, Name } from "./UserLabel";
import IUser from "../../../interfaces/User";
import Avatar from "../../Abstracts/Avatar";
import IItem from "../../../interfaces/Item";
import { Title, ItemsContainer, Section } from "../styleSection";
import Item from "../ItemsSection/ItemSmall/ItemSmall";
import { IUserStore } from "../../../store/user";
import makeItemsIsOwnProperty from "../../../functions/makeItemsIsOwnProperty";

export interface IUserProps {
  users: Array<{ user: IUser; ownItems: Array<IItem> }>;
  title?: string;
  userStore: IUserStore;
}
const UsersSection = ({ users, title }: IUserProps) => {
  return (
    <div>
      {title && <Title>{title}</Title>}
      {users.map(user => (
        <Section key={user.user._id}>
          <UserLabel>
            <Avatar size="big" src={user.user.avatar} />
            <Name>{user.user.name}</Name>
            <Button>Zobacz profil</Button>
            <Button>Obserwuj</Button>
          </UserLabel>
          {user.ownItems && (
            <ItemsContainer>
              {makeItemsIsOwnProperty(user.ownItems).map(item => (
                <Item item={item} key={item._id} />
              ))}
            </ItemsContainer>
          )}
        </Section>
      ))}
    </div>
  );
};

export default UsersSection;
