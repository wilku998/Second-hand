import styled from "styled-components";
import { FunctionComponent } from "react";
import { IProps } from "./Section";

export default (Section: FunctionComponent<IProps>) => styled(Section)`
  display: grid;
  grid-auto-rows: max-content;
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


