import React, { useEffect, useState } from "react";
import style, {
  UserLabel,
  UserInfo,
  Avatar,
  AvatarContainer,
  Name,
  Content,
  Button
} from "./styleProfile";
import { getUserRequest } from "../../API/users";
import IUser from "../../interfaces/User";
import IItem from "../../interfaces/User";
import { FakeImage } from "../Abstracts/FakeImage";
import Section from "../Section/ItemsSection/ItemsSection";

export interface IProps {
  className?: string;
  match: any;
}

const Profile = ({ className, match }: IProps) => {
  const userID = match.params.id;
  const [user, setUser]: [
    { user: IUser; ownItems: Array<IItem> },
    any
  ] = useState(undefined);
  useEffect(() => {
    const fetchData = async () => {
      const foundedUser = await getUserRequest(userID);
      if (foundedUser) {
        setUser(foundedUser);
      }
    };
    fetchData();
  }, [userID]);

  if (user) {
    var { avatar, name, followedBy, follows } = user.user;
    var { ownItems } = user;
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
              <Button>Wyślij wiadomość</Button>
              <Button>Obserwuj</Button>
            </UserInfo>
          </UserLabel>
          {ownItems && <Section items={ownItems} title="Przedmioty użytkownika" />}
        </Content>
      ) : (
        <span>użytkownik nie został odnaleziony</span>
      )}
    </section>
  );
};

export default style(Profile);
