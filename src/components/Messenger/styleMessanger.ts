import styled from "styled-components";

export const StyledMessanger = styled.div`
  margin: auto;
  display: grid;
  grid-template-columns: 30rem 1fr;
  ${({ theme }) => `
    width: ${theme.rowWidth};
    box-shadow: ${theme.lightShadow};
  `}
`;

export const InterlocutorsTitle = styled.h3`
  font-weight: 400;
  font-size: 1.6rem;
  padding: 0 2rem;  
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => `
        border-top: ${theme.lightBorder2};
        border-left: ${theme.lightBorder2};
        background-color: ${theme.colorGreyLight1};
    `}
`;