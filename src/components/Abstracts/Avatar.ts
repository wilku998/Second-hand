import styled from "styled-components";

export default styled.img<{size: string}>`
  object-fit: cover;
  object-position: center;
  ${({ size }) => `
    ${
      size === "big"
        ? `  width: 3rem;
    height: 3rem;`
        : `  width: 2rem;
    height: 2rem;`
    }
  `}

  border-radius: 50%;
  margin-right: 1rem;
`;