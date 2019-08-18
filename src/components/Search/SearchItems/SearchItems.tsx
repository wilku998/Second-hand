import React, { useState, ChangeEvent, Fragment } from "react";
import { observer, inject } from "mobx-react";
import { ISearchStore } from "../../../store/search";
import ItemsSection from "../../Section/ItemsSection/ItemsSection";
import SearchMenu from "./SearchMenu/SearchMenu";
import { StyledSearch } from "../styleSearch";
import useSort from "./hooks/useSort";
import sort from "./functions/sort";

interface IProps {
  searchStore?: ISearchStore;
  className?: string;
}

const SearchItems = ({ searchStore, className }: IProps) => {
  const items = searchStore.getSearchedItems;
  const sortByOptions = [
    "Data dodania (od najstarszych)",
    "Data dodania (od najświeższych)",
    "Od najniższej ceny",
    "Od najwyższej ceny"
  ];
  const { sortBy, onSortByChange } = useSort(sortByOptions);

  return (
    <StyledSearch className={className}>
      <SearchMenu
        sortByOptions={sortByOptions}
        sortBy={sortBy}
        onSortByChange={onSortByChange}
      />
      <ItemsSection items={sort(sortBy, sortByOptions, items)} />
    </StyledSearch>
  );
};

export default inject("searchStore")(observer(SearchItems));
