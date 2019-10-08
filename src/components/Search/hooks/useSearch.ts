import { useEffect } from "react";
import { getValueFromQueryString } from "../functions/functions";

export default (
  history: any,
  getItemsRequest: any,
  getCountRequest: any,
  defaultLimit: number,
  setCount: (count: number) => void,
  setItems: (items: any) => void,
  setIsFetching: (boolean: boolean) => void
) => {
  return useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      let search = history.location.search;
      const limitFromSearch = getValueFromQueryString(search, "limit");
      if (!limitFromSearch) {
        search = search.concat(
          `${search.split("?")[1] !== "" ? "&" : ""}limit=${defaultLimit}`
        );
      }

      const newCount: number = await getCountRequest(search);
      const newItems = await getItemsRequest(search);

      setCount(newCount);
      setItems(newItems);
      setIsFetching(false);
    };
    fetchData();
  }, [history.location.search]);
};
