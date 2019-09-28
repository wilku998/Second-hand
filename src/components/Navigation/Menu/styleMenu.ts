import { FunctionComponent } from "react";
import styled from "styled-components";
import ReactSVG from "react-svg";
import { IProps } from "./Menu";
import InvisibleButton from "../../Abstracts/InvisibleButton";
import media from "../../../styles/media";
import Avatar from "../../Abstracts/Avatar";

export default (Menu: FunctionComponent<IProps>) => styled(Menu)`
  list-style: none;
  display: flex;
  align-self: stretch;
  position: relative;
  margin-left: auto;
  ${media.medium`
    height: 4.5rem;
    margin-left: 0;
  `}
`;

export const MenuItem = styled.li`
  text-transform: uppercase;
  cursor: pointer;
  &:not(:last-child) {
    ${({ theme }) => `
      border-right: ${theme.lightBorder2};
    `}
  }
  &:last-child {
    padding-right: 0;
  }
`;

export const SubMenuIconContainer = styled.div<{ isselected?: string }>`
  height: 100%;
  padding: 0 1rem;
  position: relative;
  ${({ theme, isselected }) => `
      fill: ${isselected === "true" ? `${theme.colorBlue3} !important` : theme.colorGreyDark3};
      &:hover{
        fill: ${theme.colorGreyDark1};
      };
    `}
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
  }
`;

export const SubMenuList = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  width: 30rem;
  max-height: 20rem;
  overflow-y: auto;
  text-transform: none;
  text-align: center;
  line-height: 1.4;
  ${({ theme }) => `
    background-color: ${theme.colorGreyLight1};
    border: ${theme.lightBorder2};
    color: ${theme.colorGreyDark1};
  `}

  ${media.small`
    width: 100%;
    position: fixed;
    top: 4.5rem;
    border-left: none;
    border-right: none;
  `}
`;

export const SubMenuListItem = styled.li<{
  isunreaded?: string;
}>`
  padding: 0.7rem 1rem;
  width: 100%;
  ${({ theme, isunreaded }) => `
      background-color: ${
        isunreaded === "true" ? theme.colorGreyLight3 : theme.colorGreyLight1
      };
      &:not(:last-child){
        border-bottom: ${theme.lightBorder};
      }
    `}
`;

export const SubMenuListItemNotification = styled(SubMenuListItem)`
  cursor: initial;
`;

export const SubMenuListItemContent = styled.div`
  font-size: 1.2rem;
  display: block;
  text-align: start;
  margin-top: 0.3rem;
  ${({ theme }) => `
      color: ${theme.colorGreyDark2};
    `}

  & a, & a:visited {
    color: black;
    display: inline;
  }
`;

export const MessageInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const InterlocutorName = styled.span`
  margin-left: 1rem;
`;
