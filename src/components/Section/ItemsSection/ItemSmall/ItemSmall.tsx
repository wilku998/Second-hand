import ReactSVG from "react-svg";
import React from "react";
import style, {
  Button,
  ItemDescription,
  Image,
  Title,
  LinkToItem
} from "./styleItemSmall";
import IItem from "../../../../interfaces/IItem";
import { history } from "../../../../app";
import { likeItemRequest, unlikeItemRequest } from "../../../../API/users";

interface IItemSmall extends IItem {
  isOwn: boolean;
  isLiked?: boolean;
}

export interface IProps {
  className?: string;
  item: IItemSmall;
}

const ItemSmall = ({ className, item }: IProps) => {
  const {
    price,
    size,
    category,
    brand,
    images,
    itemModel,
    _id,
    isOwn,
    isLiked
  } = item;
  const name = `${category}  ${brand}  ${itemModel ? itemModel : ""}`;

  const onButtonClick = async () => {
    if (isOwn) {
      history.push(`/items/edit/${_id}`);
    } else {
      if(isLiked){
        await unlikeItemRequest(_id);
      }else{
        await likeItemRequest(_id);
      }
    }
  };

  return (
    <div className={className}>
      <LinkToItem to={isOwn ? `/items/edit/${_id}` : `/items/${_id}`} />
      <Button onClick={onButtonClick}>
        <ReactSVG
          src={`/svg/${
            isOwn ? "edit" : `${isLiked ? "heartbreak" : "heart"}`
          }.svg`}
        />
      </Button>
      <Image src={images[0]} />
      <ItemDescription>
        <Title>{name}</Title>
        <span>
          Rozmiar: {size}
          {!isNaN(size) && "EU"}
        </span>
        <span>Cena: {price}PLN</span>
      </ItemDescription>
    </div>
  );
};

export default style(ItemSmall);
