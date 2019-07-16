import styled from "styled-components";
import { FunctionComponent } from "react";
import { IProps } from "./Navigation";

export default (Navigation: FunctionComponent<IProps>) => styled(Navigation)`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 0.5rem 4rem;
  display: flex;
  align-items: center;
  ${({ theme }) => `
  `};
`;

export const Menu = styled.ul`
  list-style: none;
  display: flex;
  margin-left: auto;
  & > li {
    padding: 0 1rem;
    text-transform: uppercase;
    font-size: 1.4rem;
    cursor: pointer;
    &:not(:last-child) {
      position: relative;
      &:after {
        content: "";
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        width: 1px;
        height: 75%;
        background-color: ${props => props.theme.colorGreyDark2};
      }
    }
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  margin-left: 3rem;
`;

export const SearchInput = styled.input`
  border-radius: 0.3rem;
  background-color: rgba(255, 255, 255, 0.7);
  font-size: 1.4rem;
  padding: 0.3rem 3.4rem 0.3rem 1rem;
  margin-left: 1.5rem;
  width: 50rem;
  ${({ theme }) => `
    border: ${theme.lightBorder2}
  `};
`;
export const SearchButton = styled.button`
  background: none;
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  & > div {
    width: 1.2rem;
    fill: ${({ theme }) => theme.colorGreyDark5};
  }
`;
