import { useEffect } from "react";
import { getValueFromQueryString } from "../functions/functions";

export default (
  history: any,
  getItems: any,
  getCount: any,
  defaultLimit: number,
  setLimit: (limit: number) => void,
  setPage: (page: number) => void,
  setCount: (count: number) => void,
  setItems: (items: any) => void
) => {
  return useEffect(() => {
    const fetchData = async () => {
      const search = history.location.search;
      const skip = parseInt(getValueFromQueryString(search, "skip") || "0");
      const limitFromSearch = parseInt(
        getValueFromQueryString(search, "limit")
      );
      if (!limitFromSearch) {
        var parsedSearch = search.concat(
          `${search.split("?")[1] !== "" ? "&" : ""}limit=${defaultLimit}`
        );
      }
      const finalSearch = parsedSearch ? parsedSearch : search;
      const newCount: number = await getCount(finalSearch);
      const newItems = await getItems(finalSearch);

      if (limitFromSearch) {
        setLimit(limitFromSearch);
      }
      setPage(skip / (limitFromSearch ? limitFromSearch : defaultLimit) + 1);
      setCount(newCount);
      setItems(newItems);
    };
    fetchData();
  }, [history.location.search]);
};
