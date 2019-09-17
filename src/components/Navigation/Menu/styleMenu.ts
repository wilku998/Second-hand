import { FunctionComponent } from "react";
import styled from "styled-components";
import ReactSVG from "react-svg";
import { IProps } from "./Menu";
import InvisibleButton from "../../Abstracts/InvisibleButton";

export default (Menu: FunctionComponent<IProps>) => styled(Menu)`
  list-style: none;
  display: flex;
  margin-left: auto;
  align-self: stretch;
  position: relative;
`;

export const MenuItem = styled.li`
  padding: 0 1rem;
  text-transform: uppercase;
  cursor: pointer;
  &:not(:last-child) {
    ${({ theme }) => `
      border-right: ${theme.lightBorder2};
    `}
  }
`;

export const ButtonIcon = styled(ReactSVG)`
  width: 1.5rem;
  height: 100%;
  position: relative;
  & svg {
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    ${({ theme }) => `
      fill: ${theme.colorGreyDark3};
    `}
  }
`;

export const SubMenuList = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  width: 100%;
  max-height: 20rem;
  overflow-y: auto;
  text-transform: none;
  text-align: center;
  ${({ theme }) => `
    background-color: ${theme.colorGreyLight1};
    border: ${theme.lightBorder2};
    color: ${theme.colorGreyDark1};
  `}
  & > li {
    width: 100%;
  }
`;

export const SubMenuListButton = styled(InvisibleButton)`
  padding: 0.7rem 1rem;
  width: 100%;
  line-height: 1.15;
  ${({ theme, color }) => `
      border-bottom: ${theme.lightBorder};
      background-color: ${
        color === "dark" ? theme.colorGreyLight2 : theme.colorGreyLight1
      };
    `}
`;

export const UserLabel = styled.div`
  display: flex;
  align-items: center;
`;

export const Info = styled.span`
  font-size: 1.2rem;
  display: block;
  text-align: start;
  margin-top: 0.3rem;
  ${({ theme }) => `
      color: ${theme.colorGreyDark3};
    `}
  & > div {
    margin-top: 0.3rem;
  }
`;

export const SubMenu = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

export const SubMenuIconContainer = styled.div`
  position: relative;
`;
