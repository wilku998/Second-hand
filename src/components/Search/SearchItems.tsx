import React from "react";
import { observer, inject } from "mobx-react";
import { ISearchStore } from "../../store/search";

interface IProps {
  searchStore: ISearchStore;
}
const SearchItems = ({ searchStore }: IProps) => {
  const items = searchStore.getSearchedItems;
  console.log({ items });
  return <main>search</main>;
};

export default inject("searchStore")(observer(SearchItems));
