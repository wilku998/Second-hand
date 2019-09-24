import styled from "styled-components";
import media from "../../../../styles/media";

export const Label = styled.div`
  display: flex;
  align-items: center;
  & > span {
    text-transform: none;
    margin-right: 1rem;
  }
`;

export const UserName = styled.span`
  white-space: nowrap;
  ${media.tiny`
    display: none;
  `}
`;
