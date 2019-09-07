import { IMinifedUser } from "../../server/functions/getMinifed";
import { IMinifedItem } from "./IItem";

export default interface INotification {
    _id: string;
    kind:
      | "follow"
      | "ownItemLikedBySomeone"
      | "followedUserLiked"
      | "followedUserFollows"
      | "followedUserAddedItem";
    user: IMinifedUser;
    item?: IMinifedItem;
    userWhoGotFollow?: IMinifedUser;
    addedAt: number;
    isReaded?: boolean;
}