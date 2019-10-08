import styled from "styled-components";
import media from "../../styles/media";

export const NotificationsList = styled.ul`
  list-style: none;
  margin-top: 1rem;
  line-height: 1.4;
  font-size: 1.2rem;

  ${({ theme }) => `
    width: ${theme.rowWidth};
    & a,
    & a:visited {
      color: ${theme.colorBlue4};    
    }
  `}

  ${media.big`
    width: 100%;
  `}
`;

export const NotificationsListItem = styled.li<{ isReaded: boolean }>`
  width: 100%;
  padding: 1rem;
  &:not(:last-child) {
    ${({ theme, isReaded }) => `
    border-bottom: ${theme.lightBorder2};
    background-color: ${isReaded ? "none" : theme.colorGreyLight4};
  `}
  }
`;
