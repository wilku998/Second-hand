import React from "react";
import { Info, UserLabel, Button } from "./styleUser";
import IUser from "../../interfaces/User";
import FollowButton from "../Abstracts/FollowButton";
import Avatar from "../Abstracts/Avatar";
import { ItemsContainer } from "../Section/styleSection";
import Item from '../Item/Item';

export interface IUserProps {
  user: IUser;
  className?: string;
}
const User = ({ user }: IUserProps) => {
  const { name, avatar, followers, ownItems } = user;
  return (
    <div>
      <UserLabel>
        <Avatar size="big" src={avatar} />
        <Info>
          <h3>{name}</h3>
          <span>Obserwujących: {followers ? followers.length : 0}</span>
          <span>
            Przedmiotów na sprzedzaż: {ownItems ? ownItems.length : 0}
          </span>
        </Info>
        <FollowButton />
      </UserLabel>
      {user.ownItems && (
        <ItemsContainer>
          {user.ownItems.map(item => (
            <Item userLabelVisible={false} item={item} key={item._id} />
          ))}
          <Button>Zobacz wszystkie</Button>
        </ItemsContainer>
      )}
    </div>
  );
};

export default User;
