import { observable, computed, autorun, toJS } from "mobx";
import IUser from "../interfaces/User";
import IItem from "../interfaces/item";
import { IUpdate, IItemKeys } from "../components/Item/CreateItem/interfaces";

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
  @computed get getOwnItems() {
    return toJS(this.ownItems);

  }
  @computed get isAuth() {
    return !!this.user;
  }
  updateItem(_id: string, update: IUpdate){
    this.ownItems = this.ownItems.map(e => {
      if(e._id === _id){
        const updatedItem = {...e}
        Object.keys(update).forEach((key: IItemKeys["keys"] | "images") => {
          updatedItem[key] = update[key]
        })
        return updatedItem
      }else{
        return e
      }
    })
  }
}
