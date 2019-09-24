import styled from "styled-components";

export const Content = styled.div`
  max-width: 35rem;
  padding: 2rem;
  border-radius: .3rem;
`;

export const ErrorMessage = styled.span`
  margin-top: -0.5rem;
  ${({ theme }) => `
        color: ${theme.colorRed};
    `}
`;
