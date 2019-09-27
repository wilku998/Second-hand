import styled from "styled-components";
import ReactSVG from "react-svg";
import { FunctionComponent } from "react";
import InvisibleButton from "../../Abstracts/InvisibleButton";
import { IProps } from "./MoveButtons";

export default (MoveButtons: FunctionComponent<IProps>) => styled(MoveButtons)`
  display: flex;
  justify-content: center;
  margin-top: 6rem;
`;

export const MoveButton = styled(InvisibleButton)<{ isselected?: string }>`
  &:not(:last-child) {
    margin-right: 1rem;
  }

  ${({ isselected, theme }) => `
    ${isselected === "true" ? `border-bottom: ${theme.darkBorder}` : ""}
  `}
`;

export const MoveIcon = styled(ReactSVG)<{ isright?: any }>`
  ${({ isright }) => `
    ${isright ? "transform: rotate(180deg);" : ""}
  `}
  & svg {
    width: 1rem;
  }
`;
