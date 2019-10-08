import { IItem } from "../../models/interfaces";
import User from "../../models/user";

export const parseItem = async (item: IItem) => {
    await item.populate("owner").execPopulate();
    const { avatar, name, _id }: any = item.owner;
    const itemObject = item.toObject();
    const likedBy = await User.find({ "likedItems.item": item._id });
    return {
      ...itemObject,
      owner: { avatar, name, _id },
      likedBy: likedBy.map(e => e._id)
    };
  };