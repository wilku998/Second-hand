const getValueFromQueryArr = (queryArr: string[], string: string) => {
  const parsedString = string + "=";
  const indexOfElement = queryArr.findIndex(e => e.includes(parsedString));
  const value = queryArr[indexOfElement];
  return value ? value.replace(parsedString, "") : undefined;
};

export const getPage = (queryArr, value, limit) => {
  const limitFromQuery = getValueFromQueryArr(queryArr, "limit");
  return (
    parseInt(value) / (limitFromQuery ? parseInt(limitFromQuery) : limit) + 1
  );
};

export const createQueryArr = (search: string) =>
  search.replace("?", "").split("&");

export const getValueFromQueryString = (search: string, string: string) => {
  const queryArr = createQueryArr(search);
  return getValueFromQueryArr(queryArr, string);
};

export const createPageButtons = (page: number, pages: number) => {
  let moveButtonsFrom: number;

  if (pages < 5 || page < 3) {
    moveButtonsFrom = 1;
  } else if (page >= 3) {
    if (pages - page + 1 === 2) {
      moveButtonsFrom = page - 3;
    } else if (pages - page + 1 === 1) {
      moveButtonsFrom = page - 4;
    } else {
      moveButtonsFrom = page - 2;
    }
  }

  const pageButtons: number[] = [];
  for (let i = moveButtonsFrom; i <= pages; i++) {
    if (pageButtons.length < 5) {
      pageButtons.push(i);
    } else {
      break;
    }
  }
  return pageButtons;
};
