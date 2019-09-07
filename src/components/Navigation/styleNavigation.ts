import styled from "styled-components";
import ReactSVG from "react-svg";
import { Link } from "react-router-dom";

export const StyledNavigation = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0 4rem;
  z-index: 100;
  display: flex;

  ${({ theme }) => `
    background-color: ${theme.colorGreyLight1};
    border-bottom: ${theme.lightBorder2};
    height: ${theme.navigationHeight};
  `};

  & li {
    &:hover {
      color: black;
    }
  }
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
`;

export const SearchContainer = styled.div`
  position: relative;
  margin-left: 3rem;
  display: flex;
`;

export const SearchCatButton = styled.button`
  width: 100%;
  height: 100%;
  padding: 0.3rem 1rem;
  background-color: white;
  border-radius: 0.3rem 0 0 0.3rem;
  display: flex;
  align-items: center;
  & > span {
    margin-right: 0.8rem;
  }
  ${({ theme }) => `
    border: ${theme.lightBorder2};
  `};
`;

export const SearchCat = styled.div`
  position: relative;
  width: 12rem;
  font-size: 1.2rem;
  margin-right: -2px;
`;

export const SearchCatButtonList = styled.ul`
  position: absolute;
  top: calc(100% - 1px);
  width: 100%;
  background-color: white;
  border-radius: 0 0 0.3rem 0.3rem;
  ${({ theme }) => `
    border: ${theme.lightBorder2};
  `};
  & > li > button {
    width: 100%;
    border: none;
    background: none;
    padding: 0.5rem 1rem;
  }
`;

export const SearchInput = styled.input`
  padding: 0.3rem 3.4rem 0.3rem 1rem;
  border-radius: 0 0.3rem 0.3rem 0;

  height: initial;
  font-size: 1.4rem;
  width: 40rem;
`;
export const SearchButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  & > div > div {
    height: 1.2rem;
    width: 1.2rem;
    fill: ${({ theme }) => theme.colorGreyDark5};
  }
`;

export const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
`;

export const Login = styled(Link)`
  margin-left: auto;
  display: flex;
  align-items: center;
`;
