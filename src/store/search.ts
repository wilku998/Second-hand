import { observable, computed, toJS } from "mobx";
import IItem from "../interfaces/IItem";
import IUser from "../interfaces/IUser";

export interface ISearchStore {
  searchedItems: Array<IItem>;
  searchedUsers: Array<IUser>;
  getSearchedItems: Array<IItem>;
  getSearchedUsers: Array<IUser>;
}
export default class SearchStore {
  @observable searchedItems: Array<IItem> = [];
  @observable searchedUsers: Array<IUser> = [];

  @computed get getSearchedUsers() {
    return toJS(this.searchedUsers);
  }
  @computed get getSearchedItems() {
    return toJS(this.searchedItems);
  }
}
