import ReactSVG from "react-svg";
import React from "react";
import style, { LikeButton, ItemDescription } from "./styleItem";
import IItem from "../../../interfaces/Item";
import UserLabel from "../UserLabel/UserLabel";
export interface IProps {
  className?: string;
  item: IItem;
  userLabelVisible: boolean
}

const Item = ({ className, item, userLabelVisible }: IProps) => {
  const { price, size, category, brand, owner } = item;

  return (
    <div className={className}>
      {userLabelVisible && <UserLabel size='small' user={owner} />}

      <ItemDescription>
        <div>
          <h3>
            {category} {brand}
          </h3>
          <LikeButton>
            <ReactSVG src="./svg/heart.svg" />
          </LikeButton>
        </div>
        <span>Size: {size}</span>
        <span>Price: {price}</span>
      </ItemDescription>
    </div>
  );
};
export default style(Item);
