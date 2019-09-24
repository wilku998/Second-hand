import styled from "styled-components";

export default styled.img<{ size: string }>`
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  margin-right: 1rem;
  
  ${({ size, theme }) => `
    border: ${theme.lightBorder2};
    ${
      size === "big"
        ? `  width: 3rem;
    height: 3rem;
    `
        : `  width: 2rem;
    height: 2rem;
    `
    }
  `}
`;
