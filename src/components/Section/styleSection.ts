import styled from "styled-components";
import { FunctionComponent } from "react";
import { IProps } from "./Section";
import Button_2 from '../Abstracts/Button_2';

export default (Section: FunctionComponent<IProps>) => styled(Section)`
  display: grid;
  grid-auto-rows: max-content;
  padding: 4rem 4rem 2rem 4rem;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 400;
  margin-bottom: 1rem;
`;

export const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;
  align-items: flex-start;
  width: 109rem;
  padding-bottom: 2rem;
`;

export const Button = styled(Button_2)`
  grid-column: 1/2;
`

