import styled from "styled-components";
import { FunctionComponent } from "react";
import Button_2 from "../Abstracts/Button_2";
import InvisibleButton from "../Abstracts/InvisibleButton";

export default (SearchComponent: FunctionComponent) => styled(SearchComponent)`
  display: flex;
  flex-direction: column;
  margin: 4rem auto 0 auto;
  border-radius: 0.3rem;
  ${({ theme }) => `
    max-width: ${theme.rowWidth};
  `}
`;
