import React from "react";
import IItem from "../../../interfaces/Item";
import ItemSmall from "./ItemSmall/ItemSmall";
import { Title, ItemsContainer, Section } from "../styleSection";

export interface IProps {
  className?: string;
  title?: string;
  items: Array<IItem>;
  areOwnItems: boolean
}

const ItemsSection = ({ className, title, items, areOwnItems }: IProps) => {
  return (
    <Section className={className}>
      {title && <Title>{title}</Title>}
        <ItemsContainer>
          {items.map(item => (
            <ItemSmall isOwn={areOwnItems} item={item} key={item._id} />
          ))}
        </ItemsContainer>
    </Section>
  );
};

export default ItemsSection;
