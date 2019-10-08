import User from "../../models/user";
import { parseItem } from "./parseItems";
import { Types } from "mongoose";
import { INotification, IUser } from "../../models/interfaces";
import { getMinifedUser, getMinifedItem } from "../../functions/getMinifed";
import parseNotifications from "./parseNotifications";
import { onScrollLoadingSlice } from "./other";

export const parseFollowsAndLikes = (items: any[], property: "item" | "user") =>
  items
    .filter(e => e[property])
    .map((e: any) => {
      return e[property];
    });

const getIdOfFollowsAndLiked = (items: any[], property: "item" | "user") =>
  items
    .filter(e => e[property])
    .map((e: any) => {
      return e[property]._id;
    });

export const getFollowedBy = async (userID: string | Types.ObjectId) =>
  await User.find({ "follows.user": userID });

export const parseUser = async (user: IUser, notificationsDelete?: boolean) => {
  await user.populate("ownItems").execPopulate();
  await user.populate("follows.user").execPopulate();
  await user.populate("likedItems.item").execPopulate();
  const followedBy = await getFollowedBy(user._id);
  const ownItems = await Promise.all(
    user.ownItems.map(async (item: any) => await parseItem(item))
  );

  const parsedUser: any = {
    user: {
      ...user.toJSON(),
      follows: getIdOfFollowsAndLiked(user.follows, "user").reverse(),
      likedItems: getIdOfFollowsAndLiked(user.likedItems, "item").reverse(),
      followedBy: followedBy.map(e => e._id).reverse()
    },
    ownItems: ownItems.reverse()
  };
  delete parsedUser.followedByQuantity;

  if (notificationsDelete) {
    delete parsedUser.user.notifications;
    return parsedUser;
  } else {
    const unreadedNotificationsQuantity = user.notifications.filter(
      e => !e.isReaded
    ).length;
    delete parsedUser.user.notifications;

    return {
      ...parsedUser,
      user: {
        ...parsedUser.user,
        unreadedNotificationsQuantity,
        notificationsQuantity: user.notifications.length,
        notifications: onScrollLoadingSlice(
          "0",
          "3",
          await parseNotifications(user.notifications)
        )
      }
    };
  }
};

export const parseUsers = async (users: IUser[]) =>
  await Promise.all(users.map(user => parseUser(user, true)));
