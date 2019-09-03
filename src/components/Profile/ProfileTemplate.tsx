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
import IUser from "../../interfaces/IUser";
import IItem from "../../interfaces/IItem";
import { FakeImage } from "../Abstracts/FakeImage";
import ItemsSection from "../Section/ItemsSection/ItemsSection";
import { getFollowsAndLikes } from "../../API/users";

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
  const [follows, setFollows]: [IUser[], any] = useState([]);
  const [followedBy, setFollowedBy]: [IUser[], any] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const {
          likedItems: fetchedLikedItems,
          follows: fetchedFollows,
          followedBy: fetchedFollowedBy
        } = await getFollowsAndLikes(_id);
        setLikedItems(fetchedLikedItems);
        setFollows(fetchedFollows);
        setFollowedBy(fetchedFollowedBy);
      };
      fetchData();
    }
  }, [user]);

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
                <Button key={e.text} onClick={e.onClick}>
                  {e.text}
                </Button>
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
          {likedItems.length > 0 && (
            <ItemsSection items={likedItems} title="Polubione przedmioty" />
          )}
        </Content>
      ) : (
        <span>użytkownik nie został odnaleziony</span>
      )}
    </section>
  );
};

export default style(ProfileTemplate);
