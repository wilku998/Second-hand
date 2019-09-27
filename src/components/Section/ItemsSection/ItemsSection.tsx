import React from "react";
import IItem from "../../../interfaces/IItem";
import { Title, StyledItemSection } from "../styleSection";
import { IUserStore } from "../../../store/user";
import Items from "../Items/Items";

export interface IProps {
  title?: string;
  items: Array<IItem>;
  userStore?: IUserStore;
  limit?: number;
}

const ItemsSection = ({ title, items, limit }: IProps) => (
  <StyledItemSection>
    {title && <Title>{title}</Title>}
    <Items limit={limit} items={items} />
  </StyledItemSection>
);

export default ItemsSection;
