import { IMinifedItem } from "./IItem";
import { IMinifedUser } from "./IUser";

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
    addedAt: string;
    isReaded?: boolean;
}