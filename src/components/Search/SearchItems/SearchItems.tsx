import React, { useState, ChangeEvent, Fragment } from "react";
import { observer, inject } from "mobx-react";
import { ISearchStore } from "../../../store/search";
import ItemsSection from "../../Section/ItemsSection/ItemsSection";
import SearchMenu from "./SearchMenu/SearchMenu";
import { StyledSearch } from "../styleSearch";

interface IProps {
  searchStore?: ISearchStore;
  className?: string;
}

const SearchItems = ({ searchStore, className }: IProps) => {
  const items = searchStore.getSearchedItems;
  const sortByOptions = [
    "Od najniższej ceny",
    "Od najwyższej ceny",
    "Data dodania (od najstarszych)",
    "Data dodania (od najświeższych)"
  ];
  const [sortBy, setSortBy] = useState(sortByOptions[0]);

  const onSortByChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const sortItems = () => {
    switch (sortBy) {
      case sortByOptions[0]:
        return items.slice().sort((a, b) =>
          parseInt(a.price) - parseInt(b.price)
        );
      case sortByOptions[1]:
        return items.slice().sort((a, b) =>
          parseInt(b.price) - parseInt(a.price)
        );
      case sortByOptions[2]:
        return items
      case sortByOptions[3]:
        return items.slice().reverse();
    }
  }

  return (
    <StyledSearch className={className}>
      <SearchMenu
        sortByOptions={sortByOptions}
        sortBy={sortBy}
        onSortByChange={onSortByChange}
      />
      <ItemsSection items={sortItems()} />
    </StyledSearch>
  );
};

export default inject("searchStore")(observer(SearchItems));
