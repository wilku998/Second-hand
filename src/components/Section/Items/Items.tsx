import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import { ItemsContainer, Info, ButtonShowMore } from "../styleSection";
import IItem from "../../../interfaces/IItem";
import { IUserStore } from "../../../store/user";
import prepareItemProperties from "../../../functions/prepareItemProperties";
import ItemSmall from "./ItemSmall/ItemSmall";

interface IProps {
  items: IItem[];
  userStore?: IUserStore;
  limit?: number;
}

const Items = ({ items, userStore, limit }: IProps) => {
  const [allShowed, setAllShowed] = useState(false);
  const ownItems = userStore.getOwnItems;
  const user = userStore.getUser;
  const likedItems = user ? user.likedItems : [];
  const onShowAllClick = () => setAllShowed(!allShowed);
  const parsedItems = prepareItemProperties(items, ownItems, likedItems);

  return (
    <>
      <ItemsContainer>
        {items.length > 0 ? (
          <>
            {(!limit || allShowed
              ? parsedItems
              : parsedItems.slice(0, limit)
            ).map(item => (
              <ItemSmall item={item} key={item._id} />
            ))}
          </>
        ) : (
          <Info>Nie znaleziono przedmiotów</Info>
        )}
      </ItemsContainer>
      {items.length > limit && (
        <ButtonShowMore onClick={onShowAllClick}>
          {allShowed ? "Ukryj resztę przedmiotów" : "Pokaż resztę przedmiotów"}
        </ButtonShowMore>
      )}
    </>
  );
};

export default inject("userStore")(observer(Items));
