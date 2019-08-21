import { observable, computed, autorun, toJS } from "mobx";

export interface IViewStore {
  editProfileIsOpen: boolean;
  getEditProfileIsOpen: boolean;
  toggleEditProfile: () => void;
  removeProfileIsOpen: boolean;
  getRemoveProfileIsOpen: boolean;
  toggleRemoveProfile: () => void;
  galleryData: {
    isOpen: boolean;
    defaultPosition: number;
    images: string[];
    title: string;
  };
  closeGallery: () => void;
  getGalleryData: IViewStore["galleryData"];
}

const defaultGalleryData: IViewStore["galleryData"] = {
  isOpen: false,
  defaultPosition: 0,
  images: [],
  title: ""
};

export default class ViewStore {
  constructor() {
    autorun(() => {
      // console.log(this.getGalleryData);
    });
  }

  @observable editProfileIsOpen: boolean = false;
  @observable removeProfileIsOpen: boolean = false;
  @observable galleryData: IViewStore["galleryData"] = defaultGalleryData;

  toggleEditProfile = () => {
    this.editProfileIsOpen = !this.editProfileIsOpen;
  };

  @computed get getEditProfileIsOpen() {
    return this.editProfileIsOpen;
  }

  toggleRemoveProfile = () => {
    this.removeProfileIsOpen = !this.removeProfileIsOpen;
  };

  @computed get getRemoveProfileIsOpen() {
    return this.removeProfileIsOpen;
  }

  @computed get getGalleryData() {
    return toJS(this.galleryData);
  }

  closeGallery = () => {
    this.galleryData = defaultGalleryData;
  };
}
