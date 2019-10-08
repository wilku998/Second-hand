import { INotification } from "../../models/interfaces";
import { getMinifedUser, getMinifedItem } from "../../functions/getMinifed";

export default async (notifications: INotification[]) => {
  const parsed = await Promise.all(
    notifications.map(async e => {
      const { userWhoGotFollow, item, kind, addedAt, isReaded, _id, user } = e;

      const parsedUser = await getMinifedUser(user);
      if (!parsedUser) {
        return null;
      }

      const parsedNotification = {
        kind,
        addedAt,
        isReaded,
        _id,
        user: parsedUser
      };

      if (item) {
        const parsedItem = await getMinifedItem(item);
        if (!parsedItem) {
          return null;
        }
        return {
          ...parsedNotification,
          item: parsedItem
        };
      } else if (userWhoGotFollow) {
        const parsedUserWhoGotFollow = await getMinifedUser(e.userWhoGotFollow);
        if (!parsedUserWhoGotFollow) {
          return null;
        }
        return {
          ...parsedNotification,
          userWhoGotFollow: parsedUserWhoGotFollow
        };
      }
      return parsedNotification;
    })
  );
  return parsed.filter(e => e);
};
