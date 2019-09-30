import styled from "styled-components";
import media from "../../styles/media";
import { StyledUserLabel } from "../UserLabel/styleUserLabel";

export const MessagerStyledUserLabel = styled(StyledUserLabel)`
  border-radius: 0;
  margin-bottom: 0;
  ${({ theme }) => `
    border-left: ${theme.darkBorder3};
  `}
`;

export const MessangerContainer = styled.main`
  display: flex;
  padding: 4rem 2rem;
  min-height: 50rem;
  ${({ theme }) => `
      height: calc(100vh - ${theme.navigationHeight});
  `}
`;

export const StyledMessanger = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: 30rem 1fr;
  grid-template-rows: max-content 1fr;
  border-radius: .3rem;
  overflow: hidden;

  ${({ theme }) => `
    width: ${theme.rowWidth};
    box-shadow: ${theme.lightShadow};
    border: ${theme.darkBorder3};
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
  font-size: 1.4rem;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => `
        background-color: ${theme.colorGreyLight5};
    `}
  ${media.medium`
    display: none;
  `}
`;
