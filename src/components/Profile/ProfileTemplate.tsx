import React, { useEffect, useState } from "react";
import style, {
  UserLabel,
  UserInfo,
  Button,
  Avatar,
  AvatarContainer,
  MobileName,
  DesktopName
} from "./styleProfile";
import IUser from "../../interfaces/IUser";
import IItem from "../../interfaces/IItem";
import ItemsSection from "../Section/ItemsSection/ItemsSection";
import { getFollowsAndLikes } from "../../API/users";
import UsersSection from "../Section/UsersSection/UsersSection";
import Container from "../Abstracts/Container";

export interface IProps {
  className?: string;
  user: IUser;
  ownItems: Array<IItem>;
  buttons: Array<{ text: string; onClick: () => void }>;
  isOwnProfile: boolean;
}

const ProfileTemplate = ({
  className,
  user,
  buttons,
  isOwnProfile,
  ownItems
}: IProps) => {
  if (user) {
    var { avatar, name, _id } = user;
  }
  const [likedItems, setLikedItems]: [IItem[], any] = useState([]);
  const [follows, setFollows]: [
    { user: IUser; ownItems: IItem[] }[],
    any
  ] = useState([]);
  const [followedBy, setFollowedBy]: [
    { user: IUser; ownItems: IItem[] }[],
    any
  ] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const {
          likedItems: fetchedLikedItems,
          follows: fetchedFollows,
          followedBy: fetchedFollowedBy
        } = await getFollowsAndLikes(_id);
        console.log({ fetchedFollows, fetchedLikedItems });
        setLikedItems(fetchedLikedItems);
        setFollows(fetchedFollows);
        setFollowedBy(fetchedFollowedBy);
      };
      fetchData();
    }
  }, [user]);

  return (
    <Container>
      {user ? (
        <div className={className}>
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
              title={
                isOwnProfile ? "Twoje przedmioty" : "Przedmioty użytkownika"
              }
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
        </div>
      ) : (
        <span>użytkownik nie został odnaleziony</span>
      )}
    </Container>
  );
};

export default style(ProfileTemplate);
