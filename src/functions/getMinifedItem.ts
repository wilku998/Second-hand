import IItem from "../interfaces/IItem";

export default (item: IItem) => {
  const { brand, itemModel, category, images, _id } = item;
  return { brand, itemModel, category, images, _id };
};
