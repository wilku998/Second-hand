import React, { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import { history } from "../../app";
import style, {
  Container,
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
  ButtonSeeWhoLiked,
  LikeButton
} from "./styleItem";
import Avatar from "../Abstracts/Avatar";
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
  }

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
    const foundedItem: IItem = await getItemRequest(itemID);
    if (foundedItem) {
      setIsLiked(foundedItem.likedBy.findIndex(e => e.user === userID) > -1);
      setItem(foundedItem);
    }
    return foundedItem;
  };

  useEffect(() => {
    const isOwn = ownItems.findIndex(e => e._id === itemID) > -1;
    if (isOwn) {
      history.push(`/items/edit/${itemID}`);
    } else {
      const fetchData = async () => {
        const foundedItem = await fetchItem(itemID);
        if (foundedItem) {
          const otherItems: Array<IItem> = await getItemsRequest({
            owner: foundedItem.owner._id
          });
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
          </MainImageContainer>
          <Content>
            <Title>
              <LikeButton onClick={onLikeClick}>
                <ReactSVG
                  src={isLiked ? "/svg/heartbreak.svg" : "/svg/heart.svg"}
                />
              </LikeButton>
              {category} {brand} {itemModel ? itemModel : ""}
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
            <ButtonMessage>Napisz wiadomość do sprzedawcy</ButtonMessage>
            {images.length > 1 ? (
              <div>
                <Info>Inne zdjęcia przedmiotu</Info>
                <GridContainer>
                  {images.slice(1).map(otherImage => (
                    <Image key={otherImage}>
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
