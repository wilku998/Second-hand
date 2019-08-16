import React, { Fragment } from "react";
import { inject, observer } from "mobx-react";
import IItem from "../../../interfaces/IItem";
import ItemSmall from "./ItemSmall/ItemSmall";
import { Title, ItemsContainer, Section, Info } from "../styleSection";
import prepareItemProperties from "../../../functions/prepareItemProperties";
import { IUserStore } from "../../../store/user";

export interface IProps {
  className?: string;
  title?: string;
  items: Array<IItem>;
  userStore?: IUserStore;
}

const ItemsSection = ({ className, title, items, userStore }: IProps) => {
  const ownItems = userStore.getOwnItems;
  const user = userStore.getUser;
  const likedItems = user ? user.likedItems : [];
  return (
    <Section className={className}>
      {title && <Title>{title}</Title>}
      <ItemsContainer>
        {items.length > 0 ? (
          <Fragment>
            {prepareItemProperties(items, ownItems, likedItems).map(item => (
              <ItemSmall item={item} key={item._id} />
            ))}
          </Fragment>
        ) : (
          <Info>Nie znaleziono przedmiotów</Info>
        )}
      </ItemsContainer>
    </Section>
  );
};

export default inject("userStore")(observer(ItemsSection));
