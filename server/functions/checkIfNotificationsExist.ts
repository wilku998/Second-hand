import { INotification } from "../models/interfaces";

export default (
  notifications: INotification[],
  kind: string,
  user: {_id: string},
  property: {_id: string},
  propertyName: "item" | "userWhoGotFollow"
) =>
  notifications.findIndex(
    e =>
      e.kind === kind &&
      (property ? e[propertyName].toString() === property._id : true) &&
      e.user.toString() === user._id
  ) === -1;
