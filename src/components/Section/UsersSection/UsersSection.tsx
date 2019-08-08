import React from "react";
import { inject, observer } from "mobx-react";
import UserLabel from "./UserLabel/UserLabel";
import IUser from "../../../interfaces/IUser";
import Avatar from "../../Abstracts/Avatar";
import IItem from "../../../interfaces/IItem";
import { Title, ItemsContainer, Section } from "../styleSection";
import Item from "../ItemsSection/ItemSmall/ItemSmall";
import { IUserStore } from "../../../store/user";
import prepareItemProperties from "../../../functions/prepareItemProperties";
import checkIfIsFollowed from "../../../functions/checkIfIsFollowed";

export interface IUserProps {
  users: Array<{ user: IUser; ownItems: Array<IItem> }>;
  title?: string;
  userStore: IUserStore;
}
const UsersSection = ({ users, title, userStore }: IUserProps) => {
  const ownItems = userStore.getOwnItems;
  const ownProfile = userStore.getUser;
  const likedItems = ownProfile ? ownProfile.likedItems : [];

  return (
    <div>
      {title && <Title>{title}</Title>}
      {users.map(user => (
        <Section key={user.user._id}>
          <UserLabel
            isFollowed={checkIfIsFollowed(userStore, user.user._id)}
            isOwnProfile={user.user._id === ownProfile._id}
            user={user.user}
          />
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
