import { INotification } from "../models/interfaces";

export default (
  notifications: INotification[],
  kind: string,
  userID: string,
  secondPropertyID?: string,
  secondPropertyName?: "item" | "userWhoGotFollow"
) =>
  notifications.findIndex(
    e =>
      e.kind === kind &&
      (secondPropertyID ? e[secondPropertyName].toString() === secondPropertyID : true) &&
      e.user.toString() === userID
  ) === -1;
