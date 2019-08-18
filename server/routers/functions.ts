import multer from "multer";
import { IUser } from "../models/interfaces";

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

export const parseFollows = (users: any) =>
  users
    .map((e: any) => {
      return e.user;
    })
    .filter((e: any) => e);

export const parseLikedItems = (items: any) =>
  items
    .map((e: any) => {
      return e.item;
    })
    .filter((e: any) => e);

export const parseUser = async (user: IUser) => {
  await user.populate("ownItems").execPopulate();
  await user.populate("likedItems.item").execPopulate();
  await user.populate("follows.user").execPopulate();
  await user.populate("followedBy.user").execPopulate();
  return {
    user: {
      ...user.toJSON(),
      follows: parseFollows(user.follows),
      followedBy: parseFollows(user.followedBy),
      likedItems: parseLikedItems(user.likedItems)
    },
    ownItems: user.ownItems
  };
};
