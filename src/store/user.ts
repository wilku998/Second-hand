import { observable, computed, autorun, toJS } from "mobx";
import IUser from "../interfaces/IUser";
import IItem from "../interfaces/IItem";
import { IUpdate, IItemKeys } from "../components/CreateItem/interfaces";
import INotification from "../interfaces/INotification";

export interface IUserStore {
  user: IUser;
  ownItems: Array<IItem>;
  getUser: IUser;
  getID: string;
  getOwnItems: IUserStore["ownItems"];
  isAuth: boolean;
  updateItem: (_id: string, update: IUpdate) => void;
  updateUser: (update: any) => void;
  likeItem: (_id: string) => void;
  unlikeItem: (_id: string) => void;
  removeFromArray: (_id: string) => void;
  addToArray: (item: IItem) => void;
  ownItemLikedBySomeone: (_id: string, user: IUser) => void;
  ownItemUnlikedBySomeone: (_id: string, user: IUser) => void;
  readNotification: (id: string) => void;
  addNotification: (notification: INotification) => void;
  getSortedNotifications: INotification[];
}

export default class UserStore {
  constructor() {
    autorun(() => {
      // console.log(this.getUser);
      // console.log(this.getOwnItems);
    });
  }

  @observable user: IUser = undefined;
  @observable ownItems: Array<IItem> = [];

  @computed get getUser() {
    return toJS(this.user);
  }

  @computed get getID() {
    return this.user._id;
  }

  @computed get getOwnItems() {
    return toJS(this.ownItems);
  }
  @computed get isAuth() {
    return !!this.user;
  }

  @computed get getSortedNotifications() {
    return this.user.notifications.sort((a, b) => {
      if (a.isReaded === b.isReaded) {
        return parseInt(b.addedAt) - parseInt(a.addedAt);
      } else {
        return a.isReaded ? 2 : -2;
      }
    });
  }

  updateUser(update: any) {
    this.user = {
      ...this.user,
      ...update
    };
  }

  updateItem(_id: string, update: IUpdate) {
    this.ownItems = this.ownItems.map(e => {
      if (e._id === _id) {
        const updatedItem = { ...e };
        Object.keys(update).forEach((key: IItemKeys["keys"] | "images") => {
          updatedItem[key] = update[key];
        });
        return updatedItem;
      } else {
        return e;
      }
    });
  }

  removeItem(_id: string) {
    this.ownItems = this.ownItems.filter(e => e._id !== _id);
  }

  addItem(item: IItem) {
    this.ownItems = [item, ...this.ownItems];
  }

  removeFromArray(
    property: "follows" | "likedItems" | "followedBy",
    _id: string
  ) {
    this.user[property] = this.user[property].filter(e => e !== _id);
  }

  addToArray(
    property: "follows" | "likedItems" | "followedBy" | "notifications",
    any: any
  ) {
    this.user[property] = [any, ...this.user[property]];
  }

  addNotification(notification: INotification) {
    this.addToArray("notifications", notification);
    this.user.notificationsQuantity++;
    this.user.unreadedNotificationsQuantity++;
  }

  ownItemLikedBySomeone(_id: string, userID: string) {
    this.ownItems = this.ownItems.map(e => {
      if (e._id === _id) {
        return {
          ...e,
          likedBy: [userID, ...e.likedBy]
        };
      } else {
        return e;
      }
    });
  }

  ownItemUnlikedBySomeone(itemID: string, userID: string) {
    this.ownItems = this.ownItems.map(e => {
      if (e._id === itemID) {
        return {
          ...e,
          likedBy: e.likedBy.filter(user => user._id !== userID)
        };
      } else {
        return e;
      }
    });
  }

  readNotification(id: string) {
    if (id === "all") {
      this.user.unreadedNotificationsQuantity = 0;
    } else {
      this.user.unreadedNotificationsQuantity -= 1;
    }
    this.user.notifications = this.user.notifications.map(e =>
      id === "all" || e._id === id ? { ...e, isReaded: true } : e
    );
  }
}
