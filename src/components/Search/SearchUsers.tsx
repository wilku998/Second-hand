import React from "react";
import { observer, inject } from "mobx-react";
import { ISearchStore } from "../../store/search";

interface IProps {
  searchStore: ISearchStore;
}
const SearchUsers = ({ searchStore }: IProps) => {
  const users = searchStore.getSearchedUsers;
  console.log({ users });
  return <main>search</main>;
};

export default inject("searchStore")(observer(SearchUsers));
