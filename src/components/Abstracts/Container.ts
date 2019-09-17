import styled from "styled-components";

export default styled.main`
  padding: 4rem;
  display: flex;
  justify-content: center;
  ${({ theme }) => `
      min-height: calc(100vh - ${theme.navigationHeight});
  `}
`;