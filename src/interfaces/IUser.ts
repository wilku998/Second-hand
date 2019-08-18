import IItem from "./IItem";

export default interface IUser {
  name: string;
  email: string;
  avatar?: string;
  _id: string;
  follows?: Array<IUser>;
  followedBy?: Array<IUser>;
  likedItems?: Array<IItem>;
}
