import styled from "styled-components";

export const Content = styled.div`
  width: 35rem;
  padding: 2rem;
`;

export const ErrorMessage = styled.span`
  margin-top: -0.5rem;
  ${({ theme }) => `
        color: ${theme.colorRed};
    `}
`;
