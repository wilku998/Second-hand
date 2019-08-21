import React, { useState, useEffect } from "react";
import ProfileTemplate from "./ProfileTemplate";
import {
  getUserRequest,
  unfollowUserRequest,
  followUserRequest
} from "../../API/users";
import IUser from "../../interfaces/IUser";
import IItem from "../../interfaces/IItem";
import { observer, inject } from "mobx-react";
import { IUserStore } from "../../store/user";
import checkIfIsFollowed from "../../functions/checkIfIsFollowed";
import { history } from "../../app";

export interface IProps {
  match: any;
  userStore: IUserStore;
}

const ForeignProfile = ({ match, userStore }: IProps) => {
  const userID = match.params.id;

  const [user, setUser]: [
    { user: IUser; ownItems: Array<IItem> },
    (user: { user: IUser; ownItems: Array<IItem> }) => void
  ] = useState({ user: undefined, ownItems: undefined });
  const isFollowed = userStore.getUser ? checkIfIsFollowed(userStore, userID) : false

  const fetchData = async () => {
    const foundedUser = await getUserRequest(userID);
    if (foundedUser) {
      setUser(foundedUser);
    }
  };

  const buttons = [
    { text: "Wyślij wiadomość", onClick: () => {
      history.push(`/messenger/${userID}`)
    } },
    {
      text: isFollowed ? "Przestań obserwować" : "Obserwuj",
      onClick: async () => {
        if (isFollowed) {
          await unfollowUserRequest(userID);
        } else {
          await followUserRequest(userID);
        }
        fetchData();
      }
    }
  ];

  useEffect(() => {
    if (userID !== "me") {
      fetchData();
    }
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

export default inject("userStore")(observer(ForeignProfile));
