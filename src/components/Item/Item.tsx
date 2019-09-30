import React from "react";
import { history, viewStore } from "../../app";
import style, {
  ItemLabel,
  Button,
  ItemInfo,
  ItemAbout,
  ImagesGrid,
  Image,
  ImageContainer,
  ImageButton,
  SellerOtherItemsContainer,
  SellerProfile
} from "./styleItem";
import Avatar from "../Abstracts/Avatar";
import ItemsSection from "../Section/ItemsSection/ItemsSection";
import getItemTitle from "../../functions/getItemTitle";
import Date from "../Abstracts/Date";
import IItem from "../../interfaces/IItem";
import loadingCompontent, {
  ILoadingComponent
} from "../../HOC/loadingCompontent";

export interface IProps extends ILoadingComponent {
  item: IItem;
  onLikeClick: () => void;
  sellerOtherItems: IItem[];
  className?: string;
  isLiked: boolean;
}

const Item = ({
  className,
  item,
  onLikeClick,
  sellerOtherItems,
  isLiked
}: IProps) => {
  const {
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
    createdAt
  } = item;

  const onPhotoClick = (e: any) => {
    const { name } = e.target;
    const index = images.findIndex(e => e === name);
    viewStore.galleryData = {
      isOpen: true,
      defaultPosition: index,
      images,
      title: getItemTitle(item)
    };
  };

  const sendMessage = () => {
    history.push(`/messenger/${item.owner._id}`);
  };

  return (
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
      <ItemLabel>
        <SellerProfile to={`/users/${owner._id}`}>
          <Avatar size="big" src={owner.avatar} />
          <span>{owner.name}</span>
        </SellerProfile>
        <ItemAbout>
          <li>
            <Date date={createdAt} />
          </li>
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
        {description && <ItemInfo as="p">{description}</ItemInfo>}
        <Button onClick={onLikeClick}>
          {!isLiked ? "Dodaj to polubionych" : "Usuń z polubionych"}
        </Button>
        <Button onClick={sendMessage}>Napisz wiadomość do sprzedawcy</Button>
      </ItemLabel>
      <SellerOtherItemsContainer>
        <ItemsSection
          limit={8}
          title="Inne przedmioty sprzedającego"
          items={sellerOtherItems}
        />
      </SellerOtherItemsContainer>
    </div>
  );
};

export default loadingCompontent(style(Item));
