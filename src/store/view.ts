import { observable, computed } from "mobx";

export interface IViewStore {
  editProfileIsOpen: boolean;
  getEditProfileIsOpen: boolean;
  toggleEditProfile: () => void;
}

export default class ViewStore {
  @observable editProfileIsOpen: boolean = true;

  toggleEditProfile() {
    this.editProfileIsOpen = !this.editProfileIsOpen;
  }

  @computed get getEditProfileIsOpen() {
    return this.editProfileIsOpen;
  }
}
