import IItem, { IMinifedItem } from "../interfaces/IItem";

export default ({ category, brand, itemModel }: IItem | IMinifedItem) =>
  `${category} ${brand} ${itemModel ? itemModel : ""}`;
