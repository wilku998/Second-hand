import { FunctionComponent } from "react";
import styled from "styled-components";
import Button_2 from "../../../Abstracts/Button_2";
import InvisibleButton from "../../../Abstracts/InvisibleButton";

export default (SearchMenu: FunctionComponent<IProps>) => styled(SearchMenu)`
  margin-bottom: 2rem;
`;

export const ItemsContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  grid-gap: 1rem;
  margin-bottom: 2rem;
`;

export const Item = styled.div`
  text-transform: uppercase;
  display: inline-block;
  position: relative;
  ${({ theme }) => `
    background-color: ${theme.colorGreyLight1};
    border: ${theme.lightBorder2};
  `}
`;

export const Button = styled(Button_2)`
  font-size: 1.4rem;
`;
export const Input = styled.input`
  width: 100%;
`;

export const SearchMenuButton = styled(InvisibleButton)`
  width: 100%;
  padding: 0.75rem 1.5rem;
`;

export const InputContainer = styled.div`
  z-index: 100;
  max-height: 30rem;
  overflow-y: auto;
  position: absolute;
  font-size: 1.2rem;
  width: calc(100% + 2px);
  top: calc(100% - 1px);
  left: -1px;
  background-color: white;
  padding: 1rem;
  ${({ theme }) => `
    border: ${theme.lightBorder2};
  `}
  & input, select {
    width: 100%;
  }
`;

export const CheckLabel = styled.label`
  display: flex;
  position: relative;
  padding: 0.5rem 0 0.5rem 2rem;

  &:not(:first-of-type) {
    border-top: ${({ theme }) => theme.lightBorder2};
  }

  & > input {
    position: absolute;
    top: 50%;
    left: 1rem;
    width: 1rem;
    height: 1rem;
    transform: translate(-50%, -50%);
  }
`;

export const ButtonCleanFilter = styled(Button_2)`
  margin-top: 1rem;
  width: 100%;
`;

export const Label = styled.label`
  display: block;
  text-transform: none;
  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`;

export const ActiveFilter = styled.span`
  padding: 0.3rem 1rem 0.3rem 2.5rem;
  font-size: 1.2rem;
  position: relative;
  text-transform: uppercase;
  ${({ theme }) => `
    background-color: ${theme.colorGreyLight5};
  `}
  &:not(:last-child) {
    margin-right: 2rem;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 100%;
    height: 100%;
    width: 1rem;
    clip-path: polygon(0 0, 100% 50%, 0 100%);
    ${({ theme }) => `
      background-color: ${theme.colorGreyLight5};
    `}
  }
`;

export const RemoveActiveFilterButton = styled(InvisibleButton)`
  width: 1rem;
  height: 1.1rem;
  position: absolute;
  top: 50%;
  left: 1.25rem;
  transform: translate(-50%, -50%);
  ${({ theme }) => `
    fill: ${theme.colorGreyDark2};
  `}
`;

export const SmallTitle = styled.h4`
  line-height: 1;
  font-weight: 400;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  ${({ theme }) => `
    border-top: ${theme.lightBorder2};
  `}
  & select {
    margin-left: 1rem;
  }
`;
