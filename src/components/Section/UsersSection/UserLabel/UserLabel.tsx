import React from "react";
import Avatar from "../../../Abstracts/Avatar";
import IUser from "../../../../interfaces/IUser";
import style, { Name, Button } from "./styleUserLabel";
import { inject, observer } from "mobx-react";
import { IUserStore } from "../../../../store/user";
import { Link } from "react-router-dom";
import { history } from "../../../../app";
import checkIfIsFollowed from "../../../../functions/checkIfIsFollowed";
import { followUserRequest, unfollowUserRequest } from "../../../../API/users";

export interface IProps {
  className?: string;
  user: IUser;
  userStore: IUserStore;
  isOwnProfile: boolean;
  isFollowed: boolean;
}

const UserLabel = ({ className, user, isOwnProfile, isFollowed }: IProps) => {
  const { _id, name, avatar } = user;

  const onProfileButtonClick = () => {
    if (isOwnProfile) {
      history.push("/users/myProfile");
    } else {
      history.push(`/users/${_id}`);
    }
  };

  const onFollowClick = () => {
    if (isFollowed) {
      unfollowUserRequest(_id);
    } else {
      followUserRequest(_id);
    }
  };

  return (
    <div className={className}>
      <Avatar size="big" src={avatar} />
      <Name>{name}</Name>
      <Button onClick={onProfileButtonClick}>
        {isOwnProfile ? "Twój profil" : "Zobacz profil"}
      </Button>
      {!isOwnProfile && (
        <Button onClick={onFollowClick}>
          {isFollowed ? "Przestań obserwować" : "Obserwuj"}
        </Button>
      )}
    </div>
  );
};

export default style(UserLabel);
