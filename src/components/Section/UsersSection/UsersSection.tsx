import React from "react";
import { inject, observer } from "mobx-react";
import { UserLabel, Button, Name } from "./UserLabel";
import IUser from "../../../interfaces/IUser";
import Avatar from "../../Abstracts/Avatar";
import IItem from "../../../interfaces/IItem";
import { Title, ItemsContainer, Section } from "../styleSection";
import Item from "../ItemsSection/ItemSmall/ItemSmall";
import { IUserStore } from "../../../store/user";
import prepareItemProperties from "../../../functions/prepareItemProperties";

export interface IUserProps {
  users: Array<{ user: IUser; ownItems: Array<IItem> }>;
  title?: string;
  userStore: IUserStore;
}
const UsersSection = ({ users, title, userStore }: IUserProps) => {
  const ownItems = userStore.getOwnItems;
  const user = userStore.getUser;
  const likedItems = user ? user.likedItems : [];
  
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
              {prepareItemProperties(user.ownItems, ownItems, likedItems).map(
                item => (
                  <Item item={item} key={item._id} />
                )
              )}
            </ItemsContainer>
          )}
        </Section>
      ))}
    </div>
  );
};

export default inject("userStore")(observer(UsersSection));
