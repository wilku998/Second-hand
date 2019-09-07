import IUser from "./IUser";

export default interface IItem {
  brand: string;
  category:
    | "buty"
    | "bluza"
    | "spodnie"
    | "szorty"
    | "kurtka"
    | "plaszcz"
    | "koszulka"
    | "koszula"
    | "marynarka"
    | "czapka"
    | "skarpetki"
    | "bielizna"
    | "biżuteria"
    | "inne";
  price: string;
  size: string;
  condition: "nowy" | "używany";
  itemModel?: string;
  description?: string;
  images: Array<string>;
  _id: string;
  owner: IUser;
  likedBy: Array<IUser>;
  gender: "mężczyźni" | "kobiety" | "dzieci";
  createdAt: string;
  updatedAt: string;
}

export interface IMinifedItem {
  brand: string,
  itemModel?: string,
  category: string,
  images: string[],
  _id: string
}