import React, { useState, ChangeEvent } from "react";
import { observer, inject } from "mobx-react";
import { ISearchStore } from "../../../store/search";
import { StyledSearch } from "../styleSearch";
import { Button } from "../SearchItems/SearchMenu/styleSearchMenu";
import { SearchMenu, SearchContainer } from "./styleSearchUsers";
import UsersSection from "../../Section/UsersSection/UsersSection";
import { getUsersRequest } from "../../../API/users";
import useSort from "../SearchItems/hooks/useSort";
import sort from "../SearchItems/functions/sort";

interface IProps {
  searchStore: ISearchStore;
}

const SearchUsers = ({ searchStore }: IProps) => {
  const users = searchStore.getSearchedUsers;
  const [query, setQuery] = useState("");
  const sortByOptions = [
    "Data dodania (od najstarszych)",
    "Data dodania (od najświeższych)"
  ];
  const {sortBy, onSortByChange} = useSort(sortByOptions);

  const onSearchClick = async () => {
    const users = await getUsersRequest(query);
    searchStore.searchedUsers = users;
  };

  const onQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <StyledSearch>
      <SearchMenu>
        <SearchContainer>
          <label>
            Nazwa użytkownika
            <input type="text" value={query} onChange={onQueryChange} />
          </label>
          <Button onClick={onSearchClick}>Szukaj użytkowników</Button>
        </SearchContainer>
        <label>
          Sortuj od
          <select value={sortBy} onChange={onSortByChange}>
            {sortByOptions.map(e => <option key={e} value={e}>{e}</option>)}
          </select>
        </label>
      </SearchMenu>
      <UsersSection users={sort(sortBy, sortByOptions, users)} />
    </StyledSearch>
  );
};

export default inject("searchStore")(observer(SearchUsers));
