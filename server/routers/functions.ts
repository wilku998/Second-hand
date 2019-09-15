import multer from "multer";
import { IUser, IItem, INotification } from "../models/interfaces";
import User from "../models/user";
import { getMinifedUser, getMinifedItem } from "../functions/getMinifed";
import { Types } from "mongoose";
import { IMatch } from "./interfaces";

export const parseNumber = (number: any) =>
  number ? parseInt(number) : undefined;

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
  delete parsedUser.followedByQuantity;

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
        notifications
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

export const createQueryUsers = (name?: string) =>
  name
    ? {
        name: createRegexObj(name)
      }
    : {};

export const createQueryItems = (query: any) => {
  const { priceFrom, priceTo, name, owner } = query;

  let match: IMatch = {
    price: {$gte: priceFrom ? parseInt(priceFrom) : 0, $lte: priceTo ? parseInt(priceTo) : 10000}
  };

  Object.keys(query).forEach(
    (
      key:
        | "size"
        | "gender"
        | "category"
        | "name"
        | "owner"
        | "priceFrom"
        | "priceTo"
        | "condition"
        | "limit"
        | "skip"
        | "order"
        | "sortBy"
    ) => {
      if (
        key !== "priceFrom" &&
        key !== "priceTo" &&
        key !== "skip" &&
        key !== "limit" &&
        key !== "sortBy" &&
        key !== "order" 
      ) {
        if (key === "name") {
          match = {
            ...match,
            $or: [
              { itemModel: createRegexObj(name) },
              { brand: createRegexObj(name) }
            ]
          };
        } else if (key === "owner") {
          match.owner = owner;
        } else {
          match[key] = createRegexObj(query[key]);
        }
      }
    }
  );
  return match;
};
