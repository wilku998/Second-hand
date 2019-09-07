import multer from "multer";
import { IUser, IItem, INotification } from "../models/interfaces";
import User from "../models/user";
import { getMinifedUser, getMinifedItem } from "../functions/getMinifed";
import { Types } from "mongoose";

export const uploadImage = multer({
  limits: {
    fileSize: 1000000 //1mb
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)/)) {
      cb(new Error("Incorrect file extension."), false);
    }
    cb(undefined, true);
  }
});

export const createRegexObj = (query: string) => ({
  $regex: new RegExp(query.trim().replace(/_/g, "|")),
  $options: "i"
});

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
      follows: getIdOfFollowsAndLiked(user.follows, "user"),
      likedItems: getIdOfFollowsAndLiked(user.likedItems, "item"),
      followedBy: followedBy.map(e => e._id)
    },
    ownItems
  };
  if (notificationsDelete) {
    delete parsedUser.user.notifications;
    delete parsedUser.user.notificationsReaded;
    return parsedUser;
  } else {
    const notifications = await Promise.all(
      user.notifications.map(async (e: INotification) => {
        const {
          userWhoGotFollow,
          item,
          kind,
          addedAt,
          isReaded,
          _id,
          user
        } = e;

        const parsedUser = await getMinifedUser(e.user);
        if (!parsedUser) {
          return null;
        }

        const parsedNotification = {
          kind,
          addedAt,
          isReaded,
          _id,
          user: parsedUser
        };

        if (item) {
          const parsedItem = await getMinifedItem(item);
          if (!parsedItem) {
            return null;
          }
          return {
            ...parsedNotification,
            item: parsedItem
          };
        } else if (userWhoGotFollow) {
          const parsedUserWhoGotFollow = await getMinifedUser(
            e.userWhoGotFollow
          );
          if (!parsedUserWhoGotFollow) {
            return null;
          }
          return {
            ...parsedNotification,
            userWhoGotFollow: parsedUserWhoGotFollow
          };
        }
        return parsedNotification;
      })
    );

    return {
      ...parsedUser,
      user: {
        ...parsedUser.user,
        notifications,
      }
    };
  }
};

export const parseItem = async (item: IItem) => {
  await item.populate("owner").execPopulate();
  const { avatar, name, _id }: any = item.owner;
  const itemObject = item.toObject();
  const likedBy = await User.find({ "likedItems.item": item._id });
  return {
    ...itemObject,
    likedBy: likedBy.map(({ _id, avatar, name }) => ({ _id, avatar, name })),
    owner: { avatar, name, _id }
  };
};
