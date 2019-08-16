import styled from "styled-components";

export const Section = styled.section`
  max-width: ${({ theme }) => theme.rowWidth};
  margin-bottom: 4rem;
  &:not(:first-of-type){
    margin-top: 4rem;
  }
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 400;
  margin-bottom: 1rem;
`;

export const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 4rem;
  align-items: flex-start;
  width: 100%;
`;

export const Info = styled.span`
  grid-column: 1/5;
  text-align: center;
  margin-top: 4rem;
`