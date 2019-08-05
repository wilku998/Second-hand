import ReactSVG from "react-svg";
import React from "react";
import style, {
  Button,
  ItemDescription,
  Image,
  Title,
  LinkToItem
} from "./styleItemSmall";
import IItem from "../../../../interfaces/Item";

interface IItemSmall extends IItem {
  isOwn: boolean;
}

export interface IProps {
  className?: string;
  item: IItemSmall;
}

const ItemSmall = ({ className, item }: IProps) => {
  const { price, size, category, brand, images, itemModel, _id, isOwn } = item;
  const name = `${category}  ${brand}  ${itemModel ? itemModel : ""}`;

  const onLikeButtonClick = () => {
    console.log("e.target");
  };

  return (
    <div className={className}>
      <LinkToItem to={isOwn ? `/items/edit/${_id}` : `/items/${_id}`} />
      <Button onClick={onLikeButtonClick}>
        <ReactSVG src={`/svg/${isOwn ? "edit" : "heart"}.svg`} />
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
