import ReactSVG from "react-svg";
import React from "react";
import style, { LikeButton, ItemDescription } from "./styleItem";
import IItem from "../../../../interfaces/Item";

export interface IProps {
  className?: string;
  item: IItem;
}

const ItemSmall = ({ className, item }: IProps) => {
  const { price, size, category, brand, owner } = item;

  return (
    <div className={className}>
      <ItemDescription>
        <div>
          <h3>
            {category} {brand}
          </h3>
          <LikeButton>
            <ReactSVG src="./svg/heart.svg" />
          </LikeButton>
        </div>
        <span>Rozmiar: {size}</span>
        <span>Cena: {price}</span>
      </ItemDescription>
    </div>
  );
};
export default style(ItemSmall);
