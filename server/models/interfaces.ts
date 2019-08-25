import mongoose, { Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  generateAuthToken: () => string;
  tokens: Array<{
    token: string;
    _id?: mongoose.Types.ObjectId;
  }>;
  ownItems: Array<{ item: mongoose.Types.ObjectId }>;
  followedBy: Array<{ user: mongoose.Types.ObjectId }>;
  follows: Array<{ user: mongoose.Types.ObjectId }>;
  likedItems: Array<{ item: mongoose.Types.ObjectId }>;
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
  _id: mongoose.Types.ObjectId;
  owner: mongoose.Types.ObjectId;
  gender: "mężczyźni" | "kobiety" | "dzieci";
  likedBy: Array<{ user: mongoose.Types.ObjectId }>;
}

export interface IItemModel extends Model<IItem> {}

export interface IImage extends Document {
  buffer: Buffer;
}

export interface IImageModel extends Model<IImage> {}

export interface IMessangerRoom extends Document {
  roomName: string;
  messages: Array<{
    message: string,
    sendedAt: string,
    senderID: string
  }>;
  isReaded: boolean
}

export interface IMessangerRoomModel extends Model<IMessangerRoom> {}
