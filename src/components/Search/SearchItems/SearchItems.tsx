import React, { useState, ChangeEvent, Fragment } from "react";
import { observer, inject } from "mobx-react";
import { ISearchStore } from "../../../store/search";
import style from "../styleSearch";
import ItemsSection from "../../Section/ItemsSection/ItemsSection";
import SearchMenu from "./SearchMenu/SearchMenu";

interface IProps {
  searchStore?: ISearchStore;
  className?: string;
}
const SearchItems = ({ searchStore, className }: IProps) => {
  const items = searchStore.getSearchedItems;
  console.log({ items });

  return (
    <main className={className}>
      <SearchMenu />
      <ItemsSection items={items} />
    </main>
  );
};

export default inject("searchStore")(observer(style(SearchItems)));
