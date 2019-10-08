import React from "react";
import {
  UserLabel,
  UserInfo,
  Button,
  Avatar,
  AvatarContainer,
  MobileName,
  DesktopName,
  StyledProfile
} from "./styleProfile";
import IUser, { IProfile } from "../../interfaces/IUser";
import IItem from "../../interfaces/IItem";
import ItemsSection from "../Section/ItemsSection/ItemsSection";
import UsersSection from "../Section/UsersSection/UsersSection";
import loadingCompontent, {
  ILoadingComponent
} from "../../HOC/loadingCompontent";

export interface IProps extends ILoadingComponent {
  user: IUser;
  ownItems: Array<IItem>;
  buttons: Array<{ text: string; onClick: () => void }>;
  isOwnProfile: boolean;
  likedItems: IItem[];
  followedBy: IProfile[];
  follows: IProfile[];
}

const ProfileTemplate = ({
  user,
  buttons,
  isOwnProfile,
  ownItems,
  likedItems,
  followedBy,
  follows
}: IProps) => {
  var { avatar, name } = user;
  return (
    <StyledProfile>
      <UserLabel>
        <MobileName>{name}</MobileName>
        <AvatarContainer>
          <Avatar src={avatar} />
        </AvatarContainer>
        <UserInfo>
          <DesktopName>{name}</DesktopName>
          <span>Przedmiotów na sprzedaż: {ownItems.length}</span>
          <span>Oberwujących: {followedBy.length}</span>
          <span>Obeserwuje: {follows.length}</span>
          {buttons.map(e => (
            <Button key={e.text} onClick={e.onClick}>
              {e.text}
            </Button>
          ))}
        </UserInfo>
      </UserLabel>
      {ownItems && (
        <ItemsSection
          limit={8}
          items={ownItems}
          title={isOwnProfile ? "Twoje przedmioty" : "Przedmioty użytkownika"}
        />
      )}
      {likedItems.length > 0 && (
        <ItemsSection
          limit={8}
          items={likedItems}
          title="Polubione przedmioty"
        />
      )}
      {follows.length > 0 && (
        <UsersSection
          limit={3}
          users={follows}
          title={isOwnProfile ? "Obserwujesz" : "Obserwuje"}
        />
      )}
      {followedBy.length > 0 && (
        <UsersSection limit={3} users={followedBy} title="Obserwujący" />
      )}
    </StyledProfile>
  );
};

export default loadingCompontent(ProfileTemplate);
