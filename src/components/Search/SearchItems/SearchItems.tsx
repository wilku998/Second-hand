import React, { useState, useEffect, ChangeEvent } from "react";
import ItemsSection from "../../Section/ItemsSection/ItemsSection";
import SearchMenu from "./SearchMenu/SearchMenu";
import { StyledSearch } from "../styleSearch";
import initialFormState from "./initialFormState";
import { getItemsRequest, getItemsCountRequest } from "../../../API/items";
import { createActiveFiltersObject } from "./functions/createActiveFiltersObject";
import { ISearchItemsQuery } from "../../../interfaces/ISearchItemsQuery";
import MoveButtons from "../MoveButtons/MoveButtons";
import IItem from "../../../interfaces/IItem";
import { history } from "../../../app";
import parsePolishChars from "../../../functions/parsePolishChars";
import { createQueryArr, createPageButtons } from "../functions/functions";
import useSearch from "../hooks/useSearch";

const SearchItems = () => {
  const sortByOptions = [
    "Data dodania (od najstarszych)",
    "Data dodania (od najświeższych)",
    "Od najniższej ceny",
    "Od najwyższej ceny"
  ];
  const defaultLimit = 12;
  const [form, setForm] = useState(initialFormState);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState(sortByOptions[0]);
  const [items, setItems]: [IItem[], any] = useState([]);
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(defaultLimit);
  const pages = Math.ceil(count / limit);
  const pageButtons = createPageButtons(page, pages);
  const { name, price, gender, category, condition, size } = form;

  const activeFilters: ISearchItemsQuery["query"] = createActiveFiltersObject(
    name,
    price,
    size,
    [gender, category, condition]
  );

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
        query = createQuery(page, "price", "1");
        break;
      case sortByOptions[3]:
        query = createQuery(page, "price", "-1");
        break;
    }
    setSortBy(value);
    history.push(`/search/items${query}`);
  };

  const onMoveButtonClick = async (e: Event) => {
    const { goto } = e.currentTarget.dataset;
    const newPage = parseInt(goto);
    history.push(`/search/items${createQuery(newPage)}`);
  };

  const searchItems = async () => {
    history.push(`/search/items${createQuery(1)}`);
  };

  const createQuery = (page: number, sortBy = "_id", order = "1") =>
    `?skip=${(page - 1) * limit}&limit=${limit}&sortBy=${sortBy}&order=${order}
  ${
    activeFilters.length > 0
      ? `&${activeFilters
          .map(e => `${e.name}=${e.selectedFilters.join("|")}`)
          .join("&")}`
      : ""
  }`;

  const parseFormSelectorOptionsFromSearch = (
    options: { isChecked: boolean; option: string }[],
    selectedFilters: string[]
  ) =>
    options.map(e =>
      selectedFilters.findIndex(selected => selected === e.option) > -1
        ? { ...e, isChecked: true }
        : e
    );

  useEffect(() => {
    const search = history.location.search;
    let newForm = { ...initialFormState };
    const queryArr = createQueryArr(search);
    queryArr.forEach(string => {
      const stringArr = string.split("=");
      const property = stringArr[0];
      const value = parsePolishChars(stringArr[1]);
      if (value !== "" && property !== "skip" && property !== "limit") {
        if (
          property === "category" ||
          property === "gender" ||
          property === "condition"
        ) {
          const selectedFilters = value.split("|");
          newForm = {
            ...newForm,
            [property]: {
              ...newForm[property],
              options: parseFormSelectorOptionsFromSearch(
                newForm[property].options,
                selectedFilters
              )
            }
          };
        } else if (property === "priceFrom" || property === "priceTo") {
          newForm = {
            ...newForm,
            price: {
              ...newForm.price,
              [property]: {
                ...newForm.price[property],
                value: parseInt(value)
              }
            }
          };
        } else if (property === "name") {
          newForm = {
            ...newForm,
            name: {
              ...newForm.name,
              value
            }
          };
        } else if (property === "size") {
          let shoesSize: string = "";
          const selectedFilters = value.split("|").filter(filter => {
            const foundedValue = filter.replace("EU", "");
            if (!isNaN(parseInt(foundedValue))) {
              shoesSize = foundedValue;
              return false;
            }
            return true;
          });
          newForm = {
            ...newForm,
            size: {
              ...newForm.size,
              value: shoesSize,
              options: parseFormSelectorOptionsFromSearch(
                newForm.size.options,
                selectedFilters
              )
            }
          };
        }
      }
    });
    setForm(newForm);
  }, []);

  useSearch(
    history,
    getItemsRequest,
    getItemsCountRequest,
    defaultLimit,
    setLimit,
    setPage,
    setCount,
    setItems
  );

  return (
    <StyledSearch>
      <SearchMenu
        count={count}
        sortByOptions={sortByOptions}
        sortBy={sortBy}
        onSortByChange={onSortByChange}
        form={form}
        setForm={setForm}
        searchItems={searchItems}
        activeFilters={activeFilters}
      />
      <ItemsSection items={items} />
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

export default SearchItems;
