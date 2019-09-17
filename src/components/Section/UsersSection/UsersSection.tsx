import React, { Fragment, useState } from "react";
import { inject, observer } from "mobx-react";
import UserLabel from "../../UserLabel/UserLabel";
import IUser from "../../../interfaces/IUser";
import IItem from "../../../interfaces/IItem";
import {
  Title,
  ItemsContainer,
  Info,
  ButtonShowMore,
  StyledUsersSection,
  UserSection
} from "../styleSection";
import Item from "../ItemsSection/ItemSmall/ItemSmall";
import { IUserStore } from "../../../store/user";
import prepareItemProperties from "../../../functions/prepareItemProperties";

export interface IUserProps {
  users: Array<{ user: IUser; ownItems: Array<IItem> }>;
  title?: string;
  userStore?: IUserStore;
  limit?: number;
}
const UsersSection = ({ users, title, userStore, limit }: IUserProps) => {
  const [allShowed, setAllShowed] = useState(false);
  const ownItems = userStore.getOwnItems;
  const ownProfile = userStore.getUser;
  const likedItems = ownProfile ? ownProfile.likedItems : [];

  const onShowAllClick = () => setAllShowed(!allShowed);

  return (
    <StyledUsersSection>
      {title && <Title>{title}</Title>}
      {users.length > 0 ? (
        <Fragment>
          {(!limit || allShowed ? users : users.slice(0, limit)).map(user => (
            <UserSection key={user.user._id}>
              <UserLabel
                additionalStyles="grid-column: 1/5; margin-bottom: 2rem;"
                user={user.user}
              />
              {user.ownItems.length > 0 ? (
                <ItemsContainer>
                  {prepareItemProperties(
                    user.ownItems.slice(0, 4),
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
            </UserSection>
          ))}

          {users.length > limit && (
            <ButtonShowMore onClick={onShowAllClick}>
              {allShowed ? "Ukryj resztę" : "Pokaż resztę"}
            </ButtonShowMore>
          )}

        </Fragment>
      ) : (
        <Info>Nie znaleziono użytkowinków</Info>
      )}
    </StyledUsersSection>
  );
};

export default inject("userStore")(observer(UsersSection));
