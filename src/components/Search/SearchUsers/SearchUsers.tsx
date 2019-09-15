import React, { useState, ChangeEvent, useEffect } from "react";
import { StyledSearch } from "../styleSearch";
import { SearchMenu, SearchContainer } from "./styleSearchUsers";
import UsersSection from "../../Section/UsersSection/UsersSection";
import { getUsersRequest, getUsersCountRequest } from "../../../API/users";
import { history } from "../../../app";
import IUser from "../../../interfaces/IUser";
import useSearch from "../hooks/useSearch";
import {
  getValueFromQueryString,
  createPageButtons
} from "../functions/functions";
import MoveButtons from "../MoveButtons/MoveButtons";
import SortContainer from "../SortContainer/SortContainer";
import Button_2 from "../../Abstracts/Button_2";
import IItem from "../../../interfaces/IItem";

const SearchUsers = () => {
  const defaultLimit = 2;
  const sortByOptions = [
    "Data dodania (od najstarszych)",
    "Data dodania (od najświeższych)",
    "Popularność rosnąco",
    "Popularność malejąco"
  ];

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(defaultLimit);
  const [users, setUsers]: [
    { user: IUser[]; ownItems: IItem[] },
    any
  ] = useState([]);
  const [name, setName] = useState("");
  const [sortBy, setSortBy] = useState(sortByOptions[0]);
  const pages = Math.ceil(count / limit);
  const pageButtons = createPageButtons(page, pages);

  const onSortByChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    let query = "";
    switch (value) {
      case sortByOptions[0]:
        query = createQuery(page);
        break;
      case sortByOptions[1]:
        query = createQuery(page, "_id", "-1");
        break;
      case sortByOptions[2]:
        query = createQuery(page, "followedByQuantity", "1");
        break;
      case sortByOptions[3]:
        query = createQuery(page, "followedByQuantity", "-1");
        break;
    }
    setSortBy(value);
    history.push(`/search/users${query}`);
  };

  const onSearchClick = async () => {
    history.push(`/search/users${createQuery(1)}`);
  };

  const onMoveButtonClick = async (e: Event) => {
    const { goto } = e.currentTarget.dataset;
    const newPage = parseInt(goto);
    history.push(`/search/users${createQuery(newPage)}`);
  };

  const createQuery = (page: number, sortBy = "_id", order = "1") =>
    `?name=${name}&skip=${(page - 1) *
      limit}&limit=${limit}&sortBy=${sortBy}&order=${order}`;

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  useEffect(() => {
    const nameFromQuery = getValueFromQueryString(
      history.location.search,
      "name"
    );
    if (nameFromQuery) {
      setName(nameFromQuery);
    }
  }, []);

  useSearch(
    history,
    getUsersRequest,
    getUsersCountRequest,
    defaultLimit,
    setLimit,
    setPage,
    setCount,
    setUsers
  );

  return (
    <StyledSearch>
      <SearchMenu>
        <SearchContainer>
          <label>
            Nazwa użytkownika
            <input type="text" value={name} onChange={onNameChange} />
          </label>
          <Button_2 onClick={onSearchClick}>Szukaj użytkowników</Button_2>
        </SearchContainer>
        <SortContainer
          count={count}
          sortBy={sortBy}
          sortByOptions={sortByOptions}
          onSortByChange={onSortByChange}
        />
      </SearchMenu>
      <UsersSection users={users} />
      {pages > 1 && (
        <MoveButtons
          page={page}
          pages={pages}
          pageButtons={pageButtons}
          onMoveButtonClick={onMoveButtonClick}
        />
      )}
    </StyledSearch>
  );
};

export default SearchUsers;
