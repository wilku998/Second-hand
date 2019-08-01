import React from "react";
import { Info, UserLabel, Button } from "./styleUser";
import IUser from "../../../interfaces/User";
import FollowButton from "../../Abstracts/FollowButton";
import Avatar from "../../Abstracts/Avatar";
import IItem from "../../../interfaces/Item";
import ItemsSection from "../ItemsSection/ItemsSection";
import { Title, ItemsContainer, Section } from "../styleSection";
import Item from "../ItemsSection/Item/Item";

export interface IUserProps {
  users: Array<{ user: IUser; ownItems: Array<IItem> }>;
  title?: string;
}
const UsersSection = ({ users, title }: IUserProps) => {
  return (
    <div>
      {title && <Title>{title}</Title>}
      {users.map(user => (
        <Section key={user.user._id}>
          <UserLabel>
            <Avatar size="big" src={user.user.avatar} />
            <Info>
              <h3>{name}</h3>
              <span>Obserwujących: {user.user.follows.length}</span>
              <span>Obserwujących: {user.user.followedBy.length}</span>
              <span>
                Przedmiotów na sprzedzaż:
                {user.ownItems ? user.ownItems.length : 0}
              </span>
            </Info>
            <FollowButton />
          </UserLabel>
          {user.ownItems && (
            <ItemsContainer>
              {user.ownItems.map(item => (
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
