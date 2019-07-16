import { IUser } from "../models/interfaces";
import { Request } from "express";

export interface IUserRequest extends Request {
  user: IUser;
}
export interface IAuthRequest extends IUserRequest {
  token: string;
}

export interface IMatch {
  size?: string;
  gender?: string;
  category?: string;
  name?: { $regex: RegExp; $options: string };
}
