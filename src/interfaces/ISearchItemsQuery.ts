export interface ISearchItemsQuery {
    query: Array<{
      selectedFilters: Array<string>;
      label?: string;
      name: string;
    }>;
  }