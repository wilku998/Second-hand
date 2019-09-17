import React, { Fragment, useState } from "react";
import { inject, observer } from "mobx-react";
import IItem from "../../../interfaces/IItem";
import ItemSmall from "./ItemSmall/ItemSmall";
import {
  Title,
  ItemsContainer,
  StyledItemSection,
  Info,
  ButtonShowMore
} from "../styleSection";
import prepareItemProperties from "../../../functions/prepareItemProperties";
import { IUserStore } from "../../../store/user";

export interface IProps {
  title?: string;
  items: Array<IItem>;
  userStore?: IUserStore;
  limit?: number;
}

const ItemsSection = ({
  title,
  items,
  userStore,
  limit
}: IProps) => {
  const [allShowed, setAllShowed] = useState(false);
  const ownItems = userStore.getOwnItems;
  const user = userStore.getUser;
  const likedItems = user ? user.likedItems : [];
  const onShowAllClick = () => setAllShowed(!allShowed);
  const parsedItems = prepareItemProperties(items, ownItems, likedItems);

  return (
    <StyledItemSection>
      {title && <Title>{title}</Title>}
      <ItemsContainer>
        {items.length > 0 ? (
          <Fragment>
            {(!limit || allShowed
              ? parsedItems
              : parsedItems.slice(0, limit)
            ).map(item => (
              <ItemSmall item={item} key={item._id} />
            ))}
          </Fragment>
        ) : (
          <Info>Nie znaleziono przedmiotów</Info>
        )}
      </ItemsContainer>
      {items.length > limit && (
        <ButtonShowMore onClick={onShowAllClick}>
          {allShowed ? "Ukryj resztę" : "Pokaż resztę"}
        </ButtonShowMore>
      )}
    </StyledItemSection>
  );
};

export default inject("userStore")(observer(ItemsSection));
