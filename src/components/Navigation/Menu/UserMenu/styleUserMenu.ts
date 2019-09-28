import styled from "styled-components";
import media from "../../../../styles/media";
import { MenuItem } from "../styleMenu";

export const UserMenuContent = styled(MenuItem)`
  height: 100%;
  padding: 0.7rem 0 0.7rem 1rem;
  display: flex;
  align-items: center;
  & > span {
    text-transform: none;
  }
`;

export const UserName = styled.span`
  white-space: nowrap;
  ${media.tiny`
    display: none;
  `}
`;
