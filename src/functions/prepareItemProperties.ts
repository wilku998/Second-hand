import IItem from "../interfaces/IItem";
import IUser from "../interfaces/IUser";

export default (items: Array<IItem>, ownItems: Array<IItem>, likedItems: IUser["likedItems"]) => {
  return items.map(item => {
    const isOwn = ownItems.findIndex(e => e._id === item._id) > -1;
    if (isOwn) {
      return {
        ...item,
        isOwn
      };
    } else {
      return {
        ...item,
        isOwn,
        isLiked: likedItems.findIndex(e => e._id === item._id) > -1
      };
    }
  });
};
