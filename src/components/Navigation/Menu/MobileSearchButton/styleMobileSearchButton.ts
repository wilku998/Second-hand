import styled from "styled-components";
import { MenuItem } from "../styleMenu";
import media from "../../../../styles/media";

export const MenuItemSearchMobile = styled(MenuItem)`
  display: none;
  ${media.medium`
  display: block;
`}
`;
