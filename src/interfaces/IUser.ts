import INotification from "./INotification";
import IItem from "./IItem";

export default interface IUser {
  name: string;
  email: string;
  avatar: string;
  _id: string;
  follows?: Array<string>;
  followedBy?: Array<string>;
  likedItems?: Array<string>;
  notifications?: INotification[];
  unreadedNotificationsQuantity?: number;
  notificationsQuantity?: number;
}

export interface IMinifedUser {
  name: string;
  avatar: string;
  _id: string;
}

export interface IProfile {
  user: IUser;
  ownItems: Array<IItem>;
}