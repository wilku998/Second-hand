import React from "react";
import IItem from "../../../interfaces/Item";
import ItemSmall from "./ItemSmall/ItemSmall";
import { Title, ItemsContainer, Section } from "../styleSection";
import { inject, observer } from "mobx-react";
import { IUserStore } from "../../../store/user";
import makeItemsIsOwnProperty from "../../../functions/makeItemsIsOwnProperty";

export interface IProps {
  className?: string;
  title?: string;
  items: Array<IItem>;
}

const ItemsSection = ({ className, title, items }: IProps) => {
  const itemsWithIsOwnProperty = makeItemsIsOwnProperty(items);

  return (
    <Section className={className}>
      {title && <Title>{title}</Title>}
      <ItemsContainer>
        {itemsWithIsOwnProperty.map(item => (
          <ItemSmall item={item} key={item._id} />
        ))}
      </ItemsContainer>
    </Section>
  );
};

export default ItemsSection;
