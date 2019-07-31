import IUser from './User';

export default interface Item {
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
    gender: "mężczyźni" | "kobiety" | "dzieci";
}