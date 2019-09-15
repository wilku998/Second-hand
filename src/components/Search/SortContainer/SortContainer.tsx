import React from "react";
import style, { ResultsCountButton, ResultsCount } from "./styleSortContainer";

export interface IProps {
  limit: number;
  onSortByChange: (e: any) => void;
  sortByOptions: string[];
  sortBy: string;
  className?: string;
  onLimitChange: (e: Event) => void;
  resultsCountOptions: number[]
}

const SortContainer = ({
  limit,
  onSortByChange,
  sortByOptions,
  sortBy,
  className,
  onLimitChange,
  resultsCountOptions
}: IProps) => (
  <div className={className}>
    <ResultsCount>
      <span>Wyników na stronę</span>
      <div>
        {resultsCountOptions.map(e => (
          <ResultsCountButton onClick={onLimitChange} key={e} isselected={e === limit}>{e}</ResultsCountButton>
        ))}
      </div>
    </ResultsCount>
    <label>
      Sortuj od
      <select value={sortBy} onChange={onSortByChange}>
        {sortByOptions.map(e => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>
    </label>
  </div>
);

export default style(SortContainer);
