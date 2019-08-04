import React, { useState, useEffect } from "react";
import ProfileTemplate from "./ProfileTemplate";
import { getUserRequest } from "../../API/users";
import IUser from "../../interfaces/User";
import IItem from "../../interfaces/Item";

export interface IProps {
  match: any;
}

const ForeignProfile = ({ match }: IProps) => {
  const userID = match.params.id;
  const [user, setUser]: [
    { user: IUser; ownItems: Array<IItem> },
    (user: { user: IUser; ownItems: Array<IItem> }) => void
  ] = useState({ user: undefined, ownItems: undefined });

  const buttons = [
    { text: "Wyślij wiadomość", onClick: () => {} },
    { text: "Obserwuj", onClick: () => {} }
  ];

  useEffect(() => {
    const fetchData = async () => {
      const foundedUser = await getUserRequest(userID);
      if (foundedUser) {
        setUser(foundedUser);
      }
    };
    fetchData();
  }, [userID]);

  return (
    <ProfileTemplate
      buttons={buttons}
      user={user.user}
      ownItems={user.ownItems}
      isOwnProfile={false}
    />
  );
};

export default ForeignProfile;
