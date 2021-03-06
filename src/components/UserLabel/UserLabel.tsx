import React from "react";
import Avatar from "../Abstracts/Avatar";
import IUser, { IMinifedUser } from "../../interfaces/IUser";
import { Name, Button, StyledUserLabel, NameContainer } from "./styleUserLabel";
import { inject, observer } from "mobx-react";
import { IUserStore } from "../../store/user";
import { history } from "../../app";
import checkIfIsFollowed from "../../functions/checkIfIsFollowed";
import { followUserRequest, unfollowUserRequest } from "../../API/users";
import { StyledComponent } from "styled-components";

export interface IProps {
  user: IUser | IMinifedUser;
  userStore?: IUserStore;
  baseStyledComponent: StyledComponent<"div", any>;
}

const UserLabel = ({
  user,
  userStore,
  baseStyledComponent: BaseStyledComponent
}: IProps) => {
  const ownProfile = userStore.getUser;
  if (user) {
    var { _id, name, avatar } = user;
  }

  const isFollowed = ownProfile
    ? checkIfIsFollowed(ownProfile.follows, _id)
    : false;
  const isOwnProfile = ownProfile ? _id === ownProfile._id : false;

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
    <BaseStyledComponent>
      {user ? (
        <>
          <NameContainer>
            <Avatar size="big" src={avatar} />
            <Name>{name}</Name>
          </NameContainer>
          <Button onClick={onProfileButtonClick}>
            {isOwnProfile ? "Twój profil" : "Zobacz profil"}
          </Button>
          {!isOwnProfile && (
            <Button onClick={onFollowClick}>
              {isFollowed ? "Przestań obserwować" : "Obserwuj"}
            </Button>
          )}
        </>
      ) : (
        <span>Użytkownik nie istnieje</span>
      )}
    </BaseStyledComponent>
  );
};

UserLabel.defaultProps = {
  baseStyledComponent: StyledUserLabel
};

export default inject("userStore")(observer(UserLabel));
