import ReactSVG from "react-svg";
import React from "react";
import style, { LikeButton, ItemDescription, Image, Title, LinkToItem } from "./styleItemSmall";
import IItem from "../../../../interfaces/Item";

export interface IProps {
  className?: string;
  item: IItem;
}

const ItemSmall = ({ className, item }: IProps) => {
  const { price, size, category, brand, images, itemModel, _id } = item;
  const name = `${category}  ${brand}  ${itemModel ? itemModel : ""}`;

  const onLikeButtonClick = () => {
    console.log('e.target')
  }
  return (
    <div className={className}>
      <LinkToItem to={`/items/${_id}`} />
      <LikeButton onClick={onLikeButtonClick}>
        <ReactSVG src="/svg/heart.svg" />
      </LikeButton>
      <Image src={images[0]} />
      <ItemDescription>
        <Title>{name}</Title>
        <span>Rozmiar: {size}{!isNaN(size) && "EU"}</span>
        <span>Cena: {price}PLN</span>
      </ItemDescription>
    </div>
  );
};
export default style(ItemSmall);
