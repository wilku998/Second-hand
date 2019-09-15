import React from "react";
import styled from "styled-components";

interface IProps {
  count: number;
  onSortByChange: (e: any) => void;
  sortByOptions: string[];
  sortBy: string;
  className?: string;
}

const SortContainer = ({
  count,
  onSortByChange,
  sortByOptions,
  sortBy,
  className
}: IProps) => (
  <div className={className}>
    <span>Znaleziono: {count}</span>
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

export default styled(SortContainer)`
  display: flex;
  justify-content: space-between;
  line-height: 1;
  margin-top: 1rem;
  padding-top: 1rem;
  ${({ theme }) => `
    border-top: ${theme.lightBorder2};
  `}
  & select {
    margin-left: 1rem;
  }
`;
