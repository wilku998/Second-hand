import styled from "styled-components";
import { FunctionComponent } from "react";
import { IProps } from "./UserMenu";
import ReactSVG from "react-svg";

export const Label = styled.div`
  display: flex;
  align-items: center;
  min-width: 14rem;
  & > span {
    text-transform: none;
    margin-right: 1rem;
  }
`;

export default (UserMenu: FunctionComponent<IProps>) => styled(UserMenu)``;

export const List = styled.ul<{ width: number }>`
  position: absolute;
  top: 100%;
  right: 0;
  width: 100%;
  padding: 0 1rem;
  text-transform: none;
  text-align: center;
  ${({ theme, width }) => `
    width: calc(${width}px + (2 * ${theme.navigationListItemLeftRightPadding}));
    background-color: ${theme.colorGreyLight1};
    border-bottom: ${theme.lightBorder2};
    border-left: ${theme.lightBorder2};
    border-right: ${theme.lightBorder2};
    color: ${theme.colorGreyDark1};
  `}
  & > li {
    padding: 0.7rem 0;
    ${({ theme }) => `
    border-bottom: ${theme.lightBorder};
  `}
  }
`;

export const CollapseIcon = styled(ReactSVG)<{ listvisible: string }>`
  margin-left: auto;
  & > div > svg {
    ${({ theme, listvisible }) => `
    width: 1rem;
    fill: ${theme.colorGreyDark3};
    transform: ${listvisible==='true' ? "rotate(90deg)" : "rotate(270deg)"};
  `};
  }
`;
