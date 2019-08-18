import { observable, computed } from "mobx";

export interface IViewStore {
  editProfileIsOpen: boolean;
  getEditProfileIsOpen: boolean;
  toggleEditProfile: () => void;
  removeProfileIsOpen: boolean;
  getRemoveProfileIsOpen: boolean;
  toggleRemoveProfile: () => void;
}

export default class ViewStore {
  @observable editProfileIsOpen: boolean = false;
  @observable removeProfileIsOpen: boolean = true;

  toggleEditProfile = () => {
    this.editProfileIsOpen = !this.editProfileIsOpen;
  }

  @computed get getEditProfileIsOpen() {
    return this.editProfileIsOpen;
  }

  toggleRemoveProfile = () => {
    this.removeProfileIsOpen = !this.removeProfileIsOpen;
  }

  @computed get getRemoveProfileIsOpen() {
    return this.removeProfileIsOpen;
  }
}
