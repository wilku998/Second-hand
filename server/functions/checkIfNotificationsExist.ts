import { Types } from "mongoose";
import { INotification } from "../models/interfaces";

export default (
  notifications: INotification[],
  kind: string,
  user: { _id: Types.ObjectId | string },
  property: { _id: Types.ObjectId | string },
  propertyName: "item" | "userWhoGotFollow"
) =>
  notifications.findIndex(
    e =>
      e.kind === kind &&
      (property ? e[propertyName].toString() === property._id : true) &&
      e.user.toString() === user._id.toString()
  ) === -1;
