import styled from "styled-components";
import { SubMenuListItem } from "../styleMenu";

export const SubMenuListItemNotification = styled(SubMenuListItem)`
  cursor: initial;
  ${({theme}) => `
    & a,
    & a:visited {
      color: ${theme.colorBlue3};    
    }
  `}
`;
