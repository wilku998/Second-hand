import styled from "styled-components";

export default styled.img<{ size: string }>`
  object-fit: cover;
  object-position: center;
  border-radius: 50%;

  ${({ size, theme }) => `
    border: ${theme.lightBorder2};
    ${
      size === "big"
        ? `  width: 3rem;
    height: 3rem;
    margin-right: 1.5rem;
    `
        : `  width: 2rem;
    height: 2rem;
    margin-right: 1rem;`
    }
  `}
`;
