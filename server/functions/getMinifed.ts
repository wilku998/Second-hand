import User from "../models/user";
import Item from "../models/item";
import { Types } from "mongoose";

export interface IMinifedUser {
  name: string,
  avatar: string,
  _id: Types.ObjectId
}
export const getMinifedUser = async (_id: string | Types.ObjectId) => {
  const user = await User.findById(_id);
  if(!user){
    return null
  }
  const { name, avatar } = user;
  return {
    name,
    avatar,
    _id: user._id
  };
};

export interface IMinifedItem {
  brand: string,
  itemModel?: string,
  category: string,
  images: string[],
  _id: Types.ObjectId
}

export const getMinifedItem = async (_id: string | Types.ObjectId) => {
  const item = await Item.findById(_id);
  const { brand, itemModel, category, images } = item.toObject();
  if(!item){
    return null
  }
  return {
    brand,
    itemModel,
    category,
    images,
    _id: item._id
  };
};
