import INotification from "../interfaces/INotification";
import { IMinifedItem } from "../interfaces/IItem";
import getItemTitle from "./getItemTitle";
import { IMinifedUser } from "../interfaces/IUser";

const createSecondLinkForItem = (item: IMinifedItem) => ({
  link: `/items/${item._id}`,
  name: getItemTitle(item)
});

export default (notification: INotification) => {
  const { user, isReaded, addedAt } = notification;
  const object: {
    user: IMinifedUser;
    _id: string;
    isReaded: boolean;
    addedAt: number;
    info?: string;
    secondLink?: { name: string; link: string };
  } = {
    user,
    _id: notification._id,
    isReaded,
    addedAt
  };

  switch (notification.kind) {
    case `follow`:
      object.info = ` zabserwował cię`;
      break;
    case `followedUserAddedItem`:
      object.info = " dodał przedmiot ";
      object.secondLink = createSecondLinkForItem(notification.item);
      break;
    case `followedUserLiked`:
      object.info = ` polubił przedmiot `;
      object.secondLink = createSecondLinkForItem(notification.item);
      break;
    case `followedUserFollows`:
      object.info = ` zabserwował użytkownika `;
      object.secondLink = {
        link: `/users/${notification.userWhoGotFollow._id}`,
        name: notification.userWhoGotFollow.name
      };
      break;
    case `ownItemLikedBySomeone`:
      object.info = ` polubił twój przedmiot `;
      object.secondLink = createSecondLinkForItem(notification.item);
      break;
  }
  return object;
};
