import styled from "styled-components";
import media from "../../styles/media";

export default styled.main`
  ${({ theme }) => `
      min-height: calc(100vh - ${theme.navigationHeight});
  `}
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: fit-content;
  margin: auto;
  ${media.big`
    width: initial;
  `}
`;
