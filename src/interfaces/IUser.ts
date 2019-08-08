import IItem from "./IItem";

export default interface IUser {
  name: string;
  email: string;
  avatar?: string;
  _id: string;
  follows?: Array<{user: IUser, _id: string}>;
  followedBy?: Array<{user: IUser, _id: string}>;
  likedItems?: Array<{item: IItem, _id: string}>;
}
