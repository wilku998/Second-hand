import React from "react";
import { observer, inject } from "mobx-react";
import ProfileTemplate from "./ProfileTemplate";
import { IUserStore } from "../../store/user";
import { history } from "../../app";

interface IProps {
  userStore: IUserStore;
}
const ForeignProfile = ({ userStore }: IProps) => {
  const user = userStore.getUser;
  const ownItems = userStore.getOwnItems;

  const buttons = [
    { text: "Edytuj profil", onClick: () => {} },
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
    />
  );
};

export default inject("userStore")(observer(ForeignProfile));
