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
  return (
    <StyledSearch className={className}>
      <SearchMenu />
      <ItemsSection items={searchStore.getSearchedItems} />
    </StyledSearch>
  );
};

export default inject("searchStore")(observer(SearchItems));
