import { IUser } from "../models/interfaces";
import { Request } from "express";

export interface IUserRequest extends Request {
  user: IUser;
}
export interface IAuthRequest extends IUserRequest {
  token: string;
}

export interface IMatch {
  owner?: string;
  size?: { $regex: RegExp; $options: string };
  gender?: { $regex: RegExp; $options: string };
  category?: { $regex: RegExp; $options: string };
  brand?: { $regex: RegExp; $options: string };
  $or?: [
    { itemModel: { $regex: RegExp; $options: string } },
    { brand: { $regex: RegExp; $options: string } }
  ];
}
