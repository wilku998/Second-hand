import styled from "styled-components";
import ReactSVG from "react-svg";
import { Link } from "react-router-dom";
import media from "../../styles/media";
import Logo from "../Abstracts/Logo";
import { SubMenuIconContainer, MenuItem } from "./Menu/styleMenu";
import InvisibleButton from "../Abstracts/InvisibleButton";

export const StyledNavigation = styled.nav`
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
    &:hover {
      color: black;
    }
  }

  ${media.big`
    padding: 0 2rem;
  `}

  ${media.medium`
    height: initial;
  `}

  ${media.small`
    padding: 0 1rem;
  `}
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
`;

export const SearchContainer = styled.div<{ mobileSearchVisible: boolean }>`
  flex: 0 1 55rem;
  position: relative;
  margin: 0 1rem 0 3rem;
  display: flex;
  
  ${({ theme }) => `
    background-color: ${theme.colorGreyLight1};
    fill: ${theme.colorGreyDark3};
  `}

  ${media.medium`
    position: fixed;
    top: 4.5rem;
    left: 0;
    width: 100%;
    padding: 1rem 0;
    border-bottom: 1px solid #e2e2e2;
    border-top: 1px solid #e2e2e2;
    display: none;
    margin: 0;
    padding: .5rem 2rem;
  `}
  ${({ mobileSearchVisible }) =>
    mobileSearchVisible ? "display: flex !important;" : ""}
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
  flex: 1;
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

  ${media.medium`
    right: 3rem;
  `}
`;

export const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
`;

export const Login = styled(Link)`
  display: flex;
  align-items: center;
  margin-left: auto;
  ${media.medium`
    margin-left: 1rem;
  `}
`;

export const NavigationLogo = styled(Logo)`
  margin-left: 1rem;
  font-size: 2.2rem;
  &:before {
    width: 3rem;
    height: 3rem;
    ${({ theme }) => `
      background-image: linear-gradient(to right bottom,${theme.colorGreyLight2}, ${theme.colorGreyLight4});
    `}
  }

  ${media.small`
    & > span {
      display: none;
    }
    &:before {
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `}
`;

export const MobileSearchIcon = styled(SubMenuIconContainer)`
  height: 4.5rem;
  padding: 0 1rem;
  margin-left: auto;
  display: none;
  cursor: pointer;
  
  ${({ theme }) => `
    border-right: ${theme.lightBorder2};
  `}

  ${media.medium`
    display: block;
  `}
`;
