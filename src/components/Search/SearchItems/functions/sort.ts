import IItem from "../../../../interfaces/IItem";
import IUser from "../../../../interfaces/IUser";

export default (
  sortBy: string,
  sortByOptions: string[],
  items: IItem[] | IUser[]
) => {
  switch (sortBy) {
    case sortByOptions[0]:
      return items;
    case sortByOptions[1]:
      return items.slice().reverse();
    case sortByOptions[2]:
      return items
        .slice()
        .sort((a: any, b: any) => parseInt(a.price) - parseInt(b.price));
    case sortByOptions[3]:
      return items
        .slice()
        .sort((a: any, b: any) => parseInt(b.price) - parseInt(a.price));
  }
};
