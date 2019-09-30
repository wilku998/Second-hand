import React, { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import Item from "./Item";
import { IUserStore } from "../../store/user";
import { history } from "../../app";
import { getItemRequest, getItemsRequest } from "../../API/items";
import IItem from "../../interfaces/IItem";
import { unlikeItemRequest, likeItemRequest } from "../../API/users";

export interface IProps {
  match: any;
  userStore: IUserStore;
}

const ItemContainer = ({ match, userStore }: IProps) => {
  const itemID = match.params.id;
  const ownItems = userStore.getOwnItems;
  const user = userStore.getUser;
  const [isFetching, setIsFetching] = useState(false);
  const [item, setItem]: [IItem, any] = useState(undefined);
  const [sellerOtherItems, setSellerOtherItems] = useState([]);
  const userID = user ? user._id : undefined;

  if (item) {
    var isLiked = item.likedBy.findIndex(user => user._id === userID) > -1;
  }

  const onLikeClick = async () => {
    try {
      if (isLiked) {
        try {
          await unlikeItemRequest(itemID, item.owner._id);
          setItem({
            ...item,
            likedBy: item.likedBy.filter(e => e._id !== user._id)
          });
        } catch (e) {}
      } else {
        try {
          await likeItemRequest(itemID, item.owner._id);
          setItem({
            ...item,
            likedBy: [
              ...item.likedBy,
              { avatar: user.avatar, _id: user._id, name: user.name }
            ]
          });
        } catch (e) {}
      }
    } catch (e) {}
  };

  useEffect(() => {
    const isOwn = ownItems.findIndex(e => e._id === itemID) > -1;
    if (isOwn) {
      history.push(`/items/edit/${itemID}`);
    } else {
      setIsFetching(true);
      const fetchData = async () => {
        const foundedItem = await getItemRequest(itemID);
        if (foundedItem) {
          const otherItems: Array<IItem> = await getItemsRequest(
            `?owner=${foundedItem.owner._id}&limit=4`
          );
          setItem(foundedItem);
          if (otherItems) {
            setSellerOtherItems(otherItems.filter(e => e._id !== itemID));
          }
        }
        setIsFetching(false);
      };
      fetchData();
    }
  }, [itemID]);

  return (
    <Item
      item={item}
      sellerOtherItems={sellerOtherItems}
      isLiked={isLiked}
      onLikeClick={onLikeClick}
      isFetching={isFetching}
      shouldRender={!!item}
      notFoundMessage="Przedmiot nie został odnaleziony"
    />
  );
};

export default inject("userStore")(observer(ItemContainer));
