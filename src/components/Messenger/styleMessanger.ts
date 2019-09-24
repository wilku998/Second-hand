import styled from "styled-components";
import media from "../../styles/media";

export const MessangerContainer = styled.main`
  display: flex;
  padding: 4rem 2rem;
  ${({ theme }) => `
      height: calc(100vh - ${theme.navigationHeight});
  `}
`;

export const StyledMessanger = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: 30rem 1fr;
  grid-template-rows: max-content 1fr;
  ${({ theme }) => `
    width: ${theme.rowWidth};
    box-shadow: ${theme.lightShadow};
  `}

  ${media.big`
    width: 100%;
  `}
  ${media.medium`
    display: flex;
    flex-direction: column;
  `}
`;

export const InterlocutorsTitle = styled.h3`
  font-weight: 400;
  font-size: 1.6rem;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  text-align: center;
  ${({ theme }) => `
        border-top: ${theme.lightBorder2};
        border-left: ${theme.lightBorder2};
        background-color: ${theme.colorGreyLight1};
    `}
  ${media.medium`
    display: none;
  `}
`;
