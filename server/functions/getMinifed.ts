import User from "../models/user";
import Item from "../models/item";

export interface IMinifedUser {
  name: string,
  avatar: string,
  _id: string
}
export const getMinifedUser = async (_id: string) => {
  const user = await User.findById(_id);
  const { name, avatar } = user;
  return {
    name,
    avatar,
    _id
  };
};

export interface IMinifedItem {
  brand: string,
  model?: string,
  category: string,
  images: string[],
  _id: string
}

export const getMinifedItem = async (_id: string) => {
  const item = await Item.findById(_id);
  const { brand, model, category, images } = item.toObject();
  return {
    brand,
    model,
    category,
    images,
    _id
  };
};
