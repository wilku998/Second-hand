import styled from "styled-components";
import { FunctionComponent } from "react";
import { IProps } from "./Navigation";

export default (Navigation: FunctionComponent<IProps>) => styled(Navigation)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0 4rem;
  z-index: 100;
  ${({ theme }) => `
    background-color: ${theme.colorGreyLight1};
    border-bottom: ${theme.lightBorder2};
    height: ${theme.navigationHeight};
  `};

  & li {
    &:hover{
      color: black;
    }
  }
`;

export const Content = styled.div`
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  position: relative;
`;

export const Menu = styled.ul`
  list-style: none;
  display: flex;
  margin-left: auto;
  & > li {
    padding: ${({ theme }) => `0 ${theme.navigationListItemLeftRightPadding}`};
    text-transform: uppercase;
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
        background-color: ${props => props.theme.colorGreyLight4};
      }
    }
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  margin-left: 3rem;
`;

export const SearchInput = styled.input`
  padding: 0.3rem 3.4rem 0.3rem 1rem;
  margin-left: 1.5rem;
  width: 50rem;
`;
export const SearchButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  & > div {
    width: 1.2rem;
    fill: ${({ theme }) => theme.colorGreyDark5};
  }
`;
