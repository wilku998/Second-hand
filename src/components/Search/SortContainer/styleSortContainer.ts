import styled from "styled-components";
import { FunctionComponent } from "react";
import { IProps } from "./SortContainer";
import InvisibleButton from "../../Abstracts/InvisibleButton";

export default (SortContainer: FunctionComponent<IProps>) => styled(
  SortContainer
)`
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

export const ResultsCount = styled.div`
  display: flex;
  flex-direction: column;
  & > span {
    margin-bottom: 0.5rem;
  }
`;

export const ResultsCountButton = styled(InvisibleButton)<{
  isselected: boolean;
}>`
  padding: 0 0.5rem;
  ${({ theme, isselected }) => `
    ${
      isselected
        ? `
    color: black;
    `
        : "font-weight: 300;"
    }
    &:not(:last-child){
        border-right: ${theme.lightBorder2};
    }
  `}
`;
