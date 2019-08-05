import { userStore } from "../app";
import IItem from "../interfaces/Item";

export default (items: Array<IItem>) => {
  const ownItems = userStore.getOwnItems;
  return items.map(item => ({
    ...item,
    isOwn: ownItems.findIndex(e => e._id === item._id) > -1
  }));
};
