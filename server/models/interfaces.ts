import { Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: Buffer;
  generateAuthToken: () => string;
  tokens: Array<{
    token: string;
    _id?: string;
  }>;
  ownItems?: Array<IItem>;
}

export interface IUserModel extends Model<IUser> {
  findByCredenctials: (email: string, password: string) => IUserModel;
  generateAuthToken: () => string;
}

export interface IItem extends Document {
  name: string;
  size: string;
  gender: "men" | "women" | "unisex";
  description?: string;
  owner: string;
  price: number;
  image: Buffer;
}

export interface IItemModel extends Model<IItem> {}
