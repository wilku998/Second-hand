import styled from "styled-components";

export default styled.main`
  padding: 4rem;
  display: flex;
  ${({ theme }) => `
      min-height: calc(100vh - ${theme.navigationHeight});
  `}
`;