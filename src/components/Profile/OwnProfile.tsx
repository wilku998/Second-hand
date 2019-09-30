import React from "react";
import { observer, inject } from "mobx-react";
import ProfileTemplate from "./ProfileTemplate";
import { IUserStore } from "../../store/user";
import { history, viewStore } from "../../app";
import useFollowsAndLikes from "./hooks/useFollowsAndLikes";

interface IProps {
  userStore: IUserStore;
}
const ForeignProfile = ({ userStore }: IProps) => {
  const user = userStore.getUser;
  const ownItems = userStore.getOwnItems;
  const { likedItems, follows, followedBy, isFetching } = useFollowsAndLikes(
    user
  );

  const buttons = [
    {
      text: "Edytuj profil",
      onClick: () => {
        viewStore.toggleEditProfile();
      }
    },
    {
      text: "Dodaj przedmiot",
      onClick: () => {
        history.push("/items/create");
      }
    }
  ];

  return (
    <ProfileTemplate
      user={user}
      ownItems={ownItems}
      buttons={buttons}
      isOwnProfile={true}
      follows={follows}
      followedBy={followedBy}
      likedItems={likedItems}
      isFetching={isFetching}
      shouldRender={true}
    />
  );
};

export default inject("userStore")(observer(ForeignProfile));
