import React, {
  useState,
  ChangeEvent,
  useEffect,
  Dispatch,
  SetStateAction
} from "react";
import { StyledSearch } from "../styleSearch";
import { SearchMenu, SearchContainer, NameInput } from "./styleSearchUsers";
import UsersSection from "../../Section/UsersSection/UsersSection";
import { getUsersRequest, getUsersCountRequest } from "../../../API/users";
import { history } from "../../../app";
import IUser from "../../../interfaces/IUser";
import useSearch from "../hooks/useSearch";
import {
  createPageButtons,
  createQueryArr,
  getPage
} from "../functions/functions";
import MoveButtons from "../MoveButtons/MoveButtons";
import SortContainer from "../SortContainer/SortContainer";
import Button_2 from "../../Abstracts/Button_2";
import IItem from "../../../interfaces/IItem";
import parsePolishChars from "../../../functions/parsePolishChars";
import Container from "../../Abstracts/Container";

const SearchUsers = () => {
  const sortByOptions = [
    "Data dodania (od najstarszych)",
    "Data dodania (od najświeższych)",
    "Popularność rosnąco",
    "Popularność malejąco"
  ];
  const resultsCountOptions = [3, 6, 9, 12, 15];

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(resultsCountOptions[0]);
  const [users, setUsers]: [
    { user: IUser; ownItems: IItem[] }[],
    Dispatch<SetStateAction<any[]>>
  ] = useState([]);
  const [name, setName] = useState("");
  const [searchRequest, setSearchRequest] = useState(false);
  const [sortBy, setSortBy] = useState(sortByOptions[0]);
  const pages = Math.ceil(count / limit);
  const pageButtons = createPageButtons(page, pages);

  const onSortByChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSortBy(value);
    onSearchClick();
  };

  const onSearchClick = () => {
    setPage(1);
    setSearchRequest(true);
  };

  const onMoveButtonClick = (e: Event) => {
    const { goto } = e.currentTarget.dataset;
    setPage(parseInt(goto));
    setSearchRequest(true);
  };

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onLimitChange = (e: Event) => {
    setLimit(parseInt(e.target.innerHTML));
    onSearchClick();
  };

  useEffect(() => {
    if (searchRequest) {
      let sort = "";
      let order = "";

      switch (sortBy) {
        case sortByOptions[0]:
          sort = "_id";
          order = "1";
          break;
        case sortByOptions[1]:
          sort = "_id";
          order = "-1";
          break;
        case sortByOptions[2]:
          sort = "followedByQuantity";
          order = "1";
          break;
        case sortByOptions[3]:
          sort = "followedByQuantity";
          order = "-1";
          break;
      }

      const query = `?name=${name}&skip=${(page - 1) *
        limit}&limit=${limit}&sortBy=${sort}&order=${order}`;

      history.push(`/search/users${query}`);
      setSearchRequest(false);
    }
  }, [searchRequest]);

  useEffect(() => {
    const queryArr = createQueryArr(parsePolishChars(history.location.search));
    queryArr.forEach(string => {
      const stringArr = string.split("=");
      const property = stringArr[0];
      const value = stringArr[1];
      switch (property) {
        case "name":
          setName(value);
          break;
        case "sortBy":
          const indexOfOrder = queryArr.findIndex(e => e.includes("order"));
          if (indexOfOrder > -1) {
            const order = queryArr[indexOfOrder].replace("order=", "");
            if (value === "_id" && order === "1") {
              setSortBy(sortByOptions[0]);
            } else if (value === "_id" && order === "-1") {
              setSortBy(sortByOptions[0]);
            } else if (value === "followedByQuantity" && order === "1") {
              setSortBy(sortByOptions[0]);
            } else if (value === "followedByQuantity" && order === "-1") {
              setSortBy(sortByOptions[0]);
            }
            break;
          }
          break;
        case "limit":
          setLimit(parseInt(value));
          break;
        case "skip":
          setPage(getPage(queryArr, value, limit));
          break;
      }
    });
  }, []);

  useSearch(
    history,
    getUsersRequest,
    getUsersCountRequest,
    resultsCountOptions[0],
    setCount,
    setUsers
  );

  return (
    <Container>
      <StyledSearch>
        <SearchMenu>
          <SearchContainer>
            <NameInput
              placeholder="Nazwa użytkownika"
              type="text"
              value={name}
              onChange={onNameChange}
            />
            <Button_2 onClick={onSearchClick}>Szukaj użytkowników</Button_2>
          </SearchContainer>
          <SortContainer
            limit={limit}
            sortBy={sortBy}
            sortByOptions={sortByOptions}
            onSortByChange={onSortByChange}
            onLimitChange={onLimitChange}
            resultsCountOptions={resultsCountOptions}
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
    </Container>
  );
};

export default SearchUsers;
