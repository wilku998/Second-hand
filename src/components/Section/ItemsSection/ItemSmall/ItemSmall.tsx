import ReactSVG from "react-svg";
import React from "react";
import style, { LikeButton, ItemDescription, Image, Title } from "./styleItemSmall";
import IItem from "../../../../interfaces/Item";

export interface IProps {
  className?: string;
  item: IItem;
}

const ItemSmall = ({ className, item }: IProps) => {
  const { price, size, category, brand, images, itemModel } = item;
  const name = `${category}  ${brand}  ${itemModel ? itemModel : ""}`;
  return (
    <div className={className}>
      <LikeButton>
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
