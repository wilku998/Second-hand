import React from "react";
import style, {
  UserLabel,
  UserInfo,
  Avatar,
  AvatarContainer,
  Name,
  Content,
  Button
} from "./styleProfile";
import IUser from "../../interfaces/User";
import IItem from "../../interfaces/Item";
import { FakeImage } from "../Abstracts/FakeImage";
import ItemsSection from "../Section/ItemsSection/ItemsSection";

export interface IProps {
  className?: string;
  user: IUser;
  ownItems: Array<IItem>;
  buttons: Array<{ text: string; onClick: () => void }>;
  isOwnProfile: boolean;
}

const ProfileTemplate = ({ className, user, ownItems, buttons, isOwnProfile }: IProps) => {
  if (user) {
    var { avatar, name, followedBy, follows } = user;
  }

  return (
    <section className={className}>
      {user ? (
        <Content>
          <UserLabel>
            <AvatarContainer>
              <FakeImage />
              <Avatar src={avatar} />
            </AvatarContainer>
            <UserInfo>
              <Name>{name}</Name>
              <span>Przedmiotów na sprzedaż: {ownItems.length}</span>
              <span>Oberwujących: {followedBy.length}</span>
              <span>Obeserwuje: {follows.length}</span>
              {buttons.map(e => (
                <Button key={e.text} onClick={e.onClick}>{e.text}</Button>
              ))}
            </UserInfo>
          </UserLabel>
          {ownItems && (
            <ItemsSection
              items={ownItems}
              title={
                isOwnProfile ? "Twoje przedmioty" : "Przedmioty użytkownika"
              }
            />
          )}
        </Content>
      ) : (
        <span>użytkownik nie został odnaleziony</span>
      )}
    </section>
  );
};

export default style(ProfileTemplate);
