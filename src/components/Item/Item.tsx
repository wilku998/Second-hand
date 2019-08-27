import React, { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import { history, viewStore } from "../../app";
import style, {
  Content,
  Image,
  Description,
  Title,
  ButtonMessage,
  Seller,
  SellerProfile,
  Info,
  GridContainer,
  MainImageContainer,
  MainImage,
  ButtonSeeAll,
  SellerOtherItems,
  ItemInfo,
  LikeButton,
  ImageButton
} from "./styleItem";
import Avatar from "../Abstracts/Avatar";
import Container from "../Abstracts/Container";
import { FakeImage } from "../Abstracts/FakeImage";
import { getItemRequest, getItemsRequest } from "../../API/items";
import IItem from "../../interfaces/IItem";
import { IUserStore } from "../../store/user";
import ReactSVG from "react-svg";
import { unlikeItemRequest, likeItemRequest } from "../../API/users";

export interface IProps {
  className: string;
  match: any;
  userStore: IUserStore;
}

const Item = ({ className, match, userStore }: IProps) => {
  const itemID = match.params.id;
  const ownItems = userStore.getOwnItems;
  const user = userStore.getUser;
  const [item, setItem]: [IItem, any] = useState(undefined);
  const [isLiked, setIsLiked] = useState(false);
  const [sellerOtherItems, setSellerOtherItems] = useState([]);

  const userID = user ? user._id : "";

  if (item) {
    var {
      category,
      brand,
      size,
      price,
      images,
      owner,
      description,
      condition,
      itemModel,
      likedBy,
      _id
    } = item;
    var title = `${category} ${brand} ${itemModel ? itemModel : ""}`;
  };

  const onSeeAllClick = () => {
    history.push(`/users/${item.owner._id}`);
  };

  const onLikeClick = async () => {
    if (isLiked) {
      await unlikeItemRequest(_id);
    } else {
      await likeItemRequest(_id);
    }
    fetchItem(_id);
  };

  const fetchItem = async (id: string) => {
    const foundedItem: IItem = await getItemRequest(id);
    if (foundedItem) {
      setIsLiked(foundedItem.likedBy.findIndex(e => e.user === userID) > -1);
      setItem(foundedItem);
    }
    return foundedItem;
  };

  const onPhotoClick = (e: any) => {
    const { name } = e.target;
    const index = images.findIndex(e => e === name);
    viewStore.galleryData = {
      isOpen: true,
      defaultPosition: index,
      images,
      title
    };
  };

  const sendMessage = () => {
      history.push(`/messenger/${item.owner._id}`)
  };

  useEffect(() => {
    const isOwn = ownItems.findIndex(e => e._id === itemID) > -1;
    if (isOwn) {
      history.push(`/items/edit/${itemID}`);
    } else {
      const fetchData = async () => {
        const foundedItem = await fetchItem(itemID);
        if (foundedItem) {
          const otherItems: Array<IItem> = await getItemsRequest([
            {
              selectedFilters: [foundedItem.owner._id],
              name: "owner"
            }
          ]);
          if (otherItems) {
            setSellerOtherItems(otherItems.filter(e => e._id !== itemID));
          }
        }
      };
      fetchData();
    }
  }, [itemID]);

  return (
    <Container>
      {!item ? (
        <span>przedmiot nie został znaleziony</span>
      ) : (
        <div className={className}>
          <Seller>
            <SellerProfile>
              <Avatar size="big" src={owner.avatar} />
              <Link to={`/users/${owner._id}`}>{owner.name}</Link>
            </SellerProfile>
            {sellerOtherItems.length > 0 ? (
              <SellerOtherItems>
                <Info>Inne przedmioty sprzedającego</Info>
                <GridContainer>
                  {sellerOtherItems.slice(0, 6).map(otherItem => (
                    <Image
                      as={Link}
                      to={`/items/${otherItem._id}`}
                      key={otherItem._id}
                    >
                      <img src={otherItem.images[0]} />
                    </Image>
                  ))}
                </GridContainer>
                {sellerOtherItems.length > 6 && (
                  <ButtonSeeAll onClick={onSeeAllClick}>
                    Zobacz wszystkie
                  </ButtonSeeAll>
                )}
              </SellerOtherItems>
            ) : (
              <Info>Sprzedawca nie posiada więcej przedmiotów na sprzedaż</Info>
            )}
          </Seller>
          <MainImageContainer>
            <FakeImage />
            <MainImage src={images[0]} />
            <ImageButton onClick={onPhotoClick} name={images[0]} />
          </MainImageContainer>
          <Content>
            <Title>
              <LikeButton onClick={onLikeClick}>
                <ReactSVG
                  src={isLiked ? "/svg/heartbreak.svg" : "/svg/heart.svg"}
                />
              </LikeButton>
              {title}
            </Title>
            <ItemInfo>
              <span>Stan: {condition}</span>
              <span>Rozmiar: {size}</span>
              <span>Cena: {price}PLN</span>
              <span>
                Polubione przez {likedBy.length}{" "}
                {likedBy.length === 1 ? "osobę" : "osób"}
              </span>
              {description && <Description>{description}</Description>}
            </ItemInfo>
            <ButtonMessage onClick={sendMessage}>Napisz wiadomość do sprzedawcy</ButtonMessage>
            {images.length > 1 ? (
              <div>
                <Info>Inne zdjęcia przedmiotu</Info>
                <GridContainer>
                  {images.slice(1).map(otherImage => (
                    <Image key={otherImage}>
                      <ImageButton onClick={onPhotoClick} name={otherImage} />
                      <img src={otherImage} />
                    </Image>
                  ))}
                </GridContainer>
              </div>
            ) : (
              <Info>Przedmiot nie posiada więcej zdjęć</Info>
            )}
          </Content>
        </div>
      )}
    </Container>
  );
};

export default style(inject("userStore")(observer(Item)));
