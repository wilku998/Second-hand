import mongoose, { Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: Buffer;
  generateAuthToken: () => string;
  tokens: Array<{
    token: string;
    _id?: string;
  }>;
  ownItems?: Array<IItem>;
}

export interface IUserModel extends Model<IUser> {
  findByCredenctials: (email: string, password: string) => IUserModel;
  generateAuthToken: () => string;
}

export interface IItem extends Document {
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
  owner: mongoose.Types.ObjectId;
  gender: "mężczyźni" | "kobiety" | "dzieci";
}

export interface IItemModel extends Model<IItem> {}

export interface IImage extends Document {
  buffer: Buffer;
}

export interface IImageModel extends Model<IImage> {}
