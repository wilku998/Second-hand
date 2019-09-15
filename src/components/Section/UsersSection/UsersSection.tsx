import React, { Fragment } from "react";
import { inject, observer } from "mobx-react";
import UserLabel from "../../UserLabel/UserLabel";
import IUser from "../../../interfaces/IUser";
import IItem from "../../../interfaces/IItem";
import { Title, ItemsContainer, Section, Info } from "../styleSection";
import Item from "../ItemsSection/ItemSmall/ItemSmall";
import { IUserStore } from "../../../store/user";
import prepareItemProperties from "../../../functions/prepareItemProperties";
import checkIfIsFollowed from "../../../functions/checkIfIsFollowed";

export interface IUserProps {
  users: Array<{ user: IUser; ownItems: Array<IItem> }>;
  title?: string;
  userStore?: IUserStore;
}
const UsersSection = ({ users, title, userStore }: IUserProps) => {
  const ownItems = userStore.getOwnItems;
  const ownProfile = userStore.getUser;
  const likedItems = ownProfile ? ownProfile.likedItems : [];

  return (
    <div>
      {title && <Title>{title}</Title>}
      {users.length > 0 ? (
        <Fragment>
          {users.map(user => (
            <Section key={user.user._id}>
              <UserLabel
                additionalStyles="grid-column: 1/5; margin-bottom: 2rem;"
                user={user.user}
              />
              {user.ownItems.length > 0 ? (
                <ItemsContainer>
                  {prepareItemProperties(
                    user.ownItems,
                    ownItems,
                    likedItems
                  ).map(item => (
                    <Item item={item} key={item._id} />
                  ))}
                </ItemsContainer>
              ) : (
                <Info>
                  Użytkownik nie posiada żadnych przedmiotów na sprzedaż.
                </Info>
              )}
            </Section>
          ))}
        </Fragment>
      ) : (
        <Info>Nie znaleziono użytkowinków</Info>
      )}
    </div>
  );
};

export default inject("userStore")(observer(UsersSection));
