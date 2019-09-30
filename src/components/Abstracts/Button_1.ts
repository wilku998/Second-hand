import styled from "styled-components";

export default styled.button`
  padding: .5rem 1rem;
  ${({ theme }) => `
    border: ${theme.darkBorder2};
    background: none;
  `}
`;
