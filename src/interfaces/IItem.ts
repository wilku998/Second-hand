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
  price: number;
  size: string;
  condition: "nowy" | "używany";
  itemModel?: string;
  description?: string;
  images: Array<string>;
  _id: string;
  owner: IUser;
  likedBy: Array<{
    _id: string;
    user: string;
  }>;
  gender: "mężczyźni" | "kobiety" | "dzieci";
}
