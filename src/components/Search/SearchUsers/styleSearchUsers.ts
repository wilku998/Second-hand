import styled from "styled-components";

export const SearchMenu = styled.nav`
  margin-bottom: 2rem;
  & select,
  input {
    margin-left: 1rem;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.7rem 2rem;
  ${({ theme }) => `
    background-color: ${theme.colorGreyLight1};
  `}
`;


