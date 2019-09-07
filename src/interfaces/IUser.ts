import IItem from "./IItem";
import INotification from "./INotification";

export default interface IUser {
  name: string;
  email: string;
  avatar: string;
  _id: string;
  follows?: Array<string>;
  followedBy?: Array<string>;
  likedItems?: Array<string>;
  notifications?: INotification[];
  notificationsReaded?: boolean;
}

export interface IMinifedUser {
  name: string;
  avatar: string;
  _id: string;
}
