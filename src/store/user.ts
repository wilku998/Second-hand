import { observable, computed, autorun, toJS } from "mobx";
import IUser from "../interfaces/IUser";
import IItem from "../interfaces/IItem";
import { IUpdate, IItemKeys } from "../components/CreateItem/interfaces";

export interface IUserStore {
  user: IUser;
  ownItems: Array<IItem>;
  getUser: IUser;
  getMinifiedUser: IUser;
  getOwnItems: IUserStore["ownItems"];
  isAuth: boolean;
  unreadedNotificationsQuantity: number;
  updateItem: (_id: string, update: IUpdate) => void;
  updateUser: (update: any) => void;
  likeItem: (_id: string) => void;
  unlikeItem: (_id: string) => void;
  removeFromArray: (_id: string) => void;
  addToArray: (item: IItem) => void;
  ownItemLikedBySomeone: (_id: string, user: IUser) => void;
  ownItemUnlikedBySomeone: (_id: string, user: IUser) => void;
  readNotification: (id: string) => void;
}

export default class UserStore {
  constructor() {
    autorun(() => {
      console.log(this.getUser);
      // console.log(this.getOwnItems);
    });
  }

  @observable user: IUser = undefined;
  @observable ownItems: Array<IItem> = [];

  @computed get getUser() {
    return toJS(this.user);
  }

  @computed get getMinifiedUser() {
    const { avatar, _id, name } = this.user;
    return {
      avatar,
      _id,
      name
    };
  }

  @computed get getOwnItems() {
    return toJS(this.ownItems);
  }
  @computed get isAuth() {
    return !!this.user;
  }

  @computed get unreadedNotificationsQuantity() {
    return this.user.notifications.filter(e => !e.isReaded).length
  };

  updateUser(update: any) {
    this.user={
      ...this.user,
      ...update
    }
  };

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
    this.ownItems = [...this.ownItems, item];
  }

  removeFromArray(
    property: "follows" | "likedItems" | "followedBy",
    _id: string
  ) {
    this.user[property] = this.user[property].filter(e => e !== _id);
  }

  addToArray(property: "follows" | "likedItems" | "followedBy" | "notifications", any: any) {
    this.user[property] = [any, ...this.user[property]];
  }

  ownItemLikedBySomeone(_id: string, user: IUser) {
    this.ownItems = this.ownItems.map(e => {
      if (e._id === _id) {
        return {
          ...e,
          likedBy: [...e.likedBy, user]
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
    this.user.notifications = this.user.notifications.map(e =>
      e._id === id ? { ...e, isReaded: true } : e
    );
  }
}
