import React, { useState, ChangeEvent } from "react";
import { observer, inject } from "mobx-react";
import { ISearchStore } from "../../../store/search";
import { StyledSearch } from "../styleSearch";
import { Button } from "../SearchItems/SearchMenu/styleSearchMenu";
import { SearchMenu, SearchContainer } from "./styleSearchUsers";
import UsersSection from "../../Section/UsersSection/UsersSection";
import { getUsersRequest } from "../../../API/users";

interface IProps {
  searchStore: ISearchStore;
}

const SearchUsers = ({ searchStore }: IProps) => {
  const [query, setQuery] = useState("");
  const users = searchStore.getSearchedUsers;

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
          <select>
            <option>od najniższej ceny</option>
          </select>
        </label>
      </SearchMenu>
      <UsersSection users={users} />
    </StyledSearch>
  );
};

export default inject("searchStore")(observer(SearchUsers));
