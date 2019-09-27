import React, { useState } from "react";
import UserLabel from "../../UserLabel/UserLabel";
import IUser from "../../../interfaces/IUser";
import IItem from "../../../interfaces/IItem";
import {
  Title,
  Info,
  ButtonShowMore,
  StyledUsersSection,
  UserSection
} from "../styleSection";
import { IUserStore } from "../../../store/user";
import Items from "../Items/Items";

export interface IUserProps {
  users: Array<{ user: IUser; ownItems: Array<IItem> }>;
  title?: string;
  userStore?: IUserStore;
  limit?: number;
};

const UsersSection = ({ users, title, limit }: IUserProps) => {
  const [allShowed, setAllShowed] = useState(false);
  const onShowAllClick = () => setAllShowed(!allShowed);

  return (
    <StyledUsersSection>
      {title && <Title>{title}</Title>}
      {users.length > 0 ? (
        <>
          {(!limit || allShowed ? users : users.slice(0, limit)).map(user => (
            <UserSection key={user.user._id}>
              <UserLabel
                additionalStyles="grid-column: 1/5; margin-bottom: 2rem;"
                user={user.user}
              />
              {user.ownItems.length > 0 ? (
                <Items limit={4} items={user.ownItems} />
              ) : (
                <Info>
                  Użytkownik nie posiada żadnych przedmiotów na sprzedaż.
                </Info>
              )}
            </UserSection>
          ))}

          {users.length > limit && (
            <ButtonShowMore onClick={onShowAllClick}>
              {allShowed
                ? "Ukryj resztę użytkowników"
                : "Pokaż resztę użytkowników"}
            </ButtonShowMore>
          )}
        </>
      ) : (
        <Info>Nie znaleziono użytkowinków</Info>
      )}
    </StyledUsersSection>
  );
};

export default UsersSection;
