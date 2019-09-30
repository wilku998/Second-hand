import { FunctionComponent } from "react";
import styled from "styled-components";
import ReactSVG from "react-svg";
import { IProps } from "./Menu";
import media from "../../../styles/media";
import InvisibleButton from "../../Abstracts/InvisibleButton";

export default (Menu: FunctionComponent<IProps>) => styled(Menu)`
  list-style: none;
  display: flex;
  align-self: stretch;
  position: relative;
  margin-left: auto;
`;

export const MenuItem = styled.li<{ isselected: string }>`
  cursor: pointer;
  ${({ theme, isselected }) => `
      ${
        isselected === "true"
          ? `fill: white;
            color: white;
          `
          : `fill: ${theme.colorGreyLight6};`
      }
      &:hover{
        fill: white;
        color: white;
      }
      &:not(:last-child) {
        border-right: ${theme.darkBorder};
      }
    `}

  &:last-child {
    padding-right: 0;
  }
`;

export const SubMenuButton = styled(InvisibleButton)`
  height: 100%;
  padding: 0 1rem;
  position: relative;
`;

export const ButtonIcon = styled(ReactSVG)`
  width: 1.5rem;
  height: 100%;
  position: relative;
  & svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export const SubMenuList = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  width: 30rem;
  max-height: calc(100vh - 6.5rem);
  overflow-y: auto;
  line-height: 1.4;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  fill: white;
  box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.2);
  border-radius: 0 0 0.3rem 0.3rem;
  ${({ theme }) => `
    color: ${theme.colorGreyLight4};
  `};

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
  position: relative;

  ${({ theme, isunreaded }) => `
      ${
        isunreaded === "true"
          ? `background-color: ${theme.colorGreyDark0};`
          : `background-color: ${theme.colorGreyDark1};`
      }

      &:not(:last-child):after{
        content: "";
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        height: 1px;
        width: calc(100% - 2rem);
        background-color: ${theme.colorGreyDark3};
      }
  `}

  &:before {
    z-index: 0;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.01);
    opacity: 0;
    transition: opacity .1s;
  }

  &:hover:before {
    opacity: 1;
  }

  & > * {
    position: relative;
    width: 100%;
    padding: 1rem;
    z-index: 1;
  }
`;

export const NotificationInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: white;
`;

export const NoNotificationsInfo = styled.div`
  text-align: center;
`;
