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
import SortContainer from "../SortContainer/SortContainer";

const SearchItems = () => {
  const sortByOptions = [
    "Data dodania (od najstarszych)",
    "Data dodania (od najświeższych)",
    "Od najniższej ceny",
    "Od najwyższej ceny"
  ];
  const resultsCountOptions = [4, 8, 12, 16, 20];
  const [searchRequest, setSearchRequest] = useState(false);
  const [form, setForm] = useState(initialFormState);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState(sortByOptions[0]);
  const [items, setItems]: [IItem[], any] = useState([]);
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(resultsCountOptions[0]);
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
    setSortBy(value);
    searchItems();
  };

  const onMoveButtonClick = async (e: Event) => {
    const { goto } = e.currentTarget.dataset;
    setPage(parseInt(goto));
    setSearchRequest(true);
  };

  const searchItems = async () => {
    setPage(1);
    setSearchRequest(true);
  };

  const onLimitChange = (e: Event) => {
    setLimit(parseInt(e.target.innerHTML));
    searchItems();
  };

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
          sort = "price";
          order = "1";
          break;
        case sortByOptions[3]:
          sort = "price";
          order = "-1";
          break;
      }

      const query = `?skip=${(page - 1) *
        limit}&limit=${limit}&sortBy=${sort}&order=${order}
      ${
        activeFilters.length > 0
          ? `&${activeFilters
              .map(e => `${e.name}=${e.selectedFilters.join("|")}`)
              .join("&")}`
          : ""
      }`;

      history.push(`/search/items${query}`);
      setSearchRequest(false);
    }
  }, [searchRequest]);

  useEffect(() => {
    let newForm = { ...initialFormState };
    const queryArr = createQueryArr(parsePolishChars(history.location.search));

    queryArr.forEach(string => {
      const stringArr = string.split("=");
      const property = stringArr[0];
      const value = stringArr[1];
      if (property === "limit") {
        setLimit(parseInt(value));
      } else if (property === "page") {
        setPage(parseInt(value));
      } else if (property === "sortBy") {
        const indexOfOrder = queryArr.findIndex(e => e.includes("order"));

        if (indexOfOrder > -1) {
          const order = queryArr[indexOfOrder].replace("order=", "");
          if (value === "_id" && order === "1") {
            setSortBy(sortByOptions[0]);
          } else if (value === "_id" && order === "-1") {
            setSortBy(sortByOptions[1]);
          } else if (value === "price" && order === "1") {
            setSortBy(sortByOptions[2]);
          } else if (value === "price" && order === "-1") {
            setSortBy(sortByOptions[3]);
          }
        }
      } else if (
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
    });
    setForm(newForm);
  }, []);

  useSearch(
    history,
    getItemsRequest,
    getItemsCountRequest,
    resultsCountOptions[0],
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
        limit={limit}
      />
      <SortContainer
        limit={limit}
        sortBy={sortBy}
        sortByOptions={sortByOptions}
        onSortByChange={onSortByChange}
        onLimitChange={onLimitChange}
        resultsCountOptions={resultsCountOptions}
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
