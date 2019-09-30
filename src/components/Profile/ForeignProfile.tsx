import React, { useState, useEffect } from "react";
import ProfileTemplate from "./ProfileTemplate";
import {
  getUserRequest,
  unfollowUserRequest,
  followUserRequest
} from "../../API/users";
import IUser, { IProfile } from "../../interfaces/IUser";
import IItem from "../../interfaces/IItem";
import { observer, inject } from "mobx-react";
import { IUserStore } from "../../store/user";
import checkIfIsFollowed from "../../functions/checkIfIsFollowed";
import { history } from "../../app";
import setFollowsAndlikes from "./setFollowsAndlikes";
import useFollowsAndLikes from "./hooks/useFollowsAndLikes";
import Loader from "../Abstracts/Loader";

export interface IProps {
  match: any;
  userStore: IUserStore;
}

const ForeignProfile = ({ match, userStore }: IProps) => {
  const userID = match.params.id;
  const ownProfile = userStore.getUser;
  const [user, setUser]: [IProfile, any] = useState({
    user: undefined,
    ownItems: undefined
  });
  const {
    likedItems,
    follows,
    followedBy,
    isFetching,
    setIsFetching
  } = useFollowsAndLikes(user.user);

  const isFollowed = userStore.getUser
    ? checkIfIsFollowed(ownProfile.follows, userID)
    : false;

  const buttons = [
    {
      text: "Wyślij wiadomość",
      onClick: () => {
        history.push(`/messenger/${userID}`);
      }
    },
    {
      text: isFollowed ? "Przestań obserwować" : "Obserwuj",
      onClick: async () => {
        if (isFollowed) {
          try {
            await unfollowUserRequest(userID);
            setUser({
              ...user,
              user: {
                ...user.user,
                followedBy: user.user.followedBy.filter(
                  e => e !== ownProfile._id
                )
              }
            });
          } catch (e) {}
        } else {
          try {
            await followUserRequest(userID);
            setUser({
              ...user,
              user: {
                ...user.user,
                followedBy: [...user.user.followedBy, ownProfile._id]
              }
            });
          } catch (e) {}
        }
      }
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
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
      follows={follows}
      followedBy={followedBy}
      likedItems={likedItems}
      isFetching={isFetching}
      shouldRender={!!user.user}
      notFoundMessage="Użytkownik nie został odnaleziony"
    />
  );
};

export default inject("userStore")(observer(ForeignProfile));
