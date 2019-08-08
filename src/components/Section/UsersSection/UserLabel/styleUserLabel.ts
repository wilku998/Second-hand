import styled from "styled-components";
import Button_2 from "../../../Abstracts/Button_2";
import { FunctionComponent } from "react";

export default (UserLabel: FunctionComponent<I>) => styled(UserLabel)`
  display: flex;
  align-items: center;
  padding: 0.7rem 2rem;
  grid-column: 1/5;
  margin-bottom: 2rem;
  ${({ theme }) => `
    background-color: ${theme.colorGreyLight1};
  `}
`;

export const Button = styled(Button_2)`
  margin-left: 2rem;
  font-size: 1.2rem;
  line-height: 1.15;
`;

export const Name = styled.h3`
  font-weight: 400;
  font-size: 1.6rem;
  margin-right: auto;
`;
