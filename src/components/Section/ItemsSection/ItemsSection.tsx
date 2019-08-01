import React from "react";
import IItem from "../../../interfaces/Item";
import Item from "./Item/Item";
import { Title, ItemsContainer, Section } from "../styleSection";

export interface IProps {
  className?: string;
  title?: string;
  items: Array<IItem>;
}

const ItemsSection = ({ className, title, items }: IProps) => {
  return (
    <Section className={className}>
      {title && <Title>{title}</Title>}
        <ItemsContainer>
          {items.map(item => (
            <Item item={item} key={item._id} />
          ))}
        </ItemsContainer>
    </Section>
  );
};

export default ItemsSection;
