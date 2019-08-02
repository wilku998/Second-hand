import { observable, computed, autorun, toJS } from "mobx";
import IUser from "../interfaces/User";
import IItem from "../interfaces/item";

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
}
