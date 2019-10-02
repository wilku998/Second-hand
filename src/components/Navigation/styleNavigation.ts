import styled from "styled-components";
import { Link } from "react-router-dom";
import media from "../../styles/media";
import Logo from "../Abstracts/Logo";

export const StyledNavigation = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0 4rem;
  z-index: 1000;

  ${({ theme }) => `
    background: linear-gradient(to right bottom, ${theme.colorGreyDark2}, ${theme.colorGreyDark1});
    height: ${theme.navigationHeight};
    color: ${theme.colorGreyLight4};
    box-shadow: ${theme.navShadow};
  `};

  ${media.big`
    padding: 0 2rem;
  `}

  ${media.medium`
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
  flex: 0 1 50rem;
  position: relative;
  margin: 0 1rem 0 3rem;
  display: flex;
  
  ${({ theme }) => `
    fill: ${theme.colorGreyDark3};
    color: ${theme.colorGreyDark3};
  `}

  ${media.medium`
    position: fixed;
    top: 4.5rem;
    left: 0;
    width: 100%;
    padding: 1rem 2rem;
    display: none;
    margin: 0;
    background-color: #252525;
    box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.2);
  `}

  ${({ mobileSearchVisible }) =>
    mobileSearchVisible ? "display: flex !important;" : ""}
`;

export const SearchCatButton = styled.button`
  width: 100%;
  height: 100%;
  padding: 0.3rem 1rem;
  border-radius: 0.5rem 0 0 0.5rem;
  display: flex;
  align-items: center;
  & > span {
    margin-right: 0.8rem;
  }
  ${({ theme }) => `
    border: ${theme.darkBorder2};
    background-color: ${theme.colorGreyLight2};
  `};
`;

export const SearchCat = styled.div`
  position: relative;
  width: 10rem;
  font-size: 1.2rem;
  margin-right: -2px;
  ${({ theme }) => `
    &:hover{
      color: ${theme.colorGreyDark1};
    }
  `};
`;

export const SearchCatButtonList = styled.ul`
  position: absolute;
  top: calc(100% - 1px);
  width: 100%;
  border-radius: 0 0 0.5rem 0.5rem;
  ${({ theme }) => `
    border: ${theme.darkBorder2};
    background-color: ${theme.colorGreyLight2};
  `};
  & > li > button {
    width: 100%;
    border: none;
    background: none;
    padding: 0.5rem 1rem;
  }
`;

export const SearchInput = styled.input`
  padding: 0.35rem 3.4rem 0.35rem 1rem;
  border-radius: 0 0.5rem 0.5rem 0;
  height: initial;
  font-size: 1.4rem;
  flex: 1;
  ${({ theme }) => `
    background-color: ${theme.colorGreyLight3};
    border: ${theme.darkBorder2};
  `};
`;

export const SearchButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 0;
  right: 0;
  width: 3.4rem;
  height: 100%;

  ${media.medium`
    right: 2rem;
    top: .5rem;
    height: calc(100% - 1rem);
  `}

  & svg {
    height: 1.2rem;
    width: 1.2rem;
  }
`;

export const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
`;

export const Login = styled(Link)`
  display: flex;
  align-items: center;
  ${media.medium`
    margin-left: 1rem;
  `}
`;

export const NavigationLogo = styled(Logo)`
  margin-left: 1rem;
  font-size: 2.2rem;
  font-weight: 300;
  color: white;

  &:before {
    width: 3rem;
    height: 3rem;
    ${({ theme }) => `
      background-image: linear-gradient(to right bottom,${theme.colorGreyDark4}, ${theme.colorGreyDark3});
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

