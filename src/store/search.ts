import { observable, computed, toJS, autorun } from "mobx";
import IItem from "../interfaces/IItem";
import IUser from "../interfaces/IUser";

export interface ISearchStore {
  searchedItems: Array<IItem>;
  searchedUsers: Array<IUser>;
  getSearchedItems: Array<IItem>;
  getSearchedUsers: Array<{ user: IUser; ownItems: IItem[] }>;
}
export default class SearchStore {
  constructor() {
    autorun(() => {
      // console.log(this.getSearchedItems);
    });
  }
  @observable searchedItems: Array<IItem> = [];
  @observable searchedUsers: Array<IUser> = [];

  @computed get getSearchedUsers() {
    return toJS(this.searchedUsers);
  }

  @computed get getSearchedItems() {
    return toJS(this.searchedItems);
  }
}
