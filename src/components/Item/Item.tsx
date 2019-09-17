import React, { useEffect, useState } from "react";
import moment from "moment";
import { inject, observer } from "mobx-react";
import { history, viewStore } from "../../app";
import style, {
  Content,
  Button,
  ItemInfo,
  ItemAbout,
  ImagesGrid,
  Image,
  ImageContainer,
  ImageButton
} from "./styleItem";
import Avatar from "../Abstracts/Avatar";
import Container from "../Abstracts/Container";
import { getItemRequest, getItemsRequest } from "../../API/items";
import IItem from "../../interfaces/IItem";
import { IUserStore } from "../../store/user";
import { unlikeItemRequest, likeItemRequest } from "../../API/users";
import { SellerProfile } from "./CreateItem/styleCreateItem";
import ItemsSection from "../Section/ItemsSection/ItemsSection";

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
  const [sellerOtherItems, setSellerOtherItems] = useState([]);
  const userID = user ? user._id : undefined;
  if (item) {
    var isLiked = item.likedBy.findIndex(user => user._id === userID) > -1;
  }

  if (item) {
    var {
      brand,
      category,
      itemModel,
      size,
      price,
      images,
      owner,
      description,
      condition,
      likedBy,
      _id,
      createdAt
    } = item;
    var parsedCreatedAt = moment(createdAt).format("DD-MM-YYYY");
  }

  const onLikeClick = async () => {
    try {
      if (isLiked) {
        try {
          await unlikeItemRequest(_id, item.owner._id);
          setItem({
            ...item,
            likedBy: item.likedBy.filter(e => e._id !== user._id)
          });
        } catch (e) {}
      } else {
        try {
          await likeItemRequest(_id, item.owner._id);
          setItem({
            ...item,
            likedBy: [
              ...item.likedBy,
              { avatar: user.avatar, _id: user._id, name: user.name }
            ]
          });
        } catch (e) {}
      }
    } catch (e) {}
  };

  const onPhotoClick = (e: any) => {
    const { name } = e.target;
    const index = images.findIndex(e => e === name);
    viewStore.galleryData = {
      isOpen: true,
      defaultPosition: index,
      images,
      title: "title"
    };
  };

  const sendMessage = () => {
    history.push(`/messenger/${item.owner._id}`);
  };

  useEffect(() => {
    const isOwn = ownItems.findIndex(e => e._id === itemID) > -1;
    if (isOwn) {
      history.push(`/items/edit/${itemID}`);
    } else {
      const fetchData = async () => {
        const foundedItem = await getItemRequest(itemID);
        if (foundedItem) {
          const otherItems: Array<IItem> = await getItemsRequest(
            `?owner=${foundedItem.owner._id}&limit=4`
          );
          setItem(foundedItem);
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
          <ImagesGrid>
            {images.map((img, i) => (
              <ImageContainer
                key={img}
                imagesQuantity={images.length}
                imagePosition={i}
              >
                <ImageButton name={img} onClick={onPhotoClick} />
                <Image src={img} />
              </ImageContainer>
            ))}
          </ImagesGrid>
          <Content>
            <SellerProfile to={`/users/${owner._id}`}>
              <Avatar size="big" src={owner.avatar} />
              <span>{owner.name}</span>
            </SellerProfile>
            <ItemAbout>
              <li>Dodano w dniu: {parsedCreatedAt}</li>
              <li>
                Polubione przez {likedBy.length}{" "}
                {likedBy.length === 1 ? "osobę" : "osób"}
              </li>
            </ItemAbout>
            <ItemInfo as="ul">
              <li>Marka: {brand}</li>
              {itemModel && <li>Marka: {itemModel}</li>}
              <li>Kategoria: {category}</li>
              <li>Stan: {condition}</li>
              <li>Rozmiar: {size}</li>
              <li>Cena: {price}PLN</li>
            </ItemInfo>
            {description && <ItemInfo as="span">{description}</ItemInfo>}
            <Button onClick={onLikeClick}>
              {!isLiked ? "Dodaj to polubionych" : "Usuń z polubionych"}
            </Button>
            <Button onClick={sendMessage}>
              Napisz wiadomość do sprzedawcy
            </Button>
          </Content>
          <ItemsSection
            limit={8}
            title="Inne przedmioty sprzedającego"
            items={sellerOtherItems}
          />
        </div>
      )}
    </Container>
  );
};

export default style(inject("userStore")(observer(Item)));
