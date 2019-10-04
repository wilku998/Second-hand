import styled from "styled-components";
import media from "../../styles/media";
import { StyledUserLabel } from "../UserLabel/styleUserLabel";
import ReactSVG from "react-svg";

export const MessagerStyledUserLabel = styled(StyledUserLabel)`
  border-radius: 0;
  margin-bottom: 0;
  ${({ theme }) => `
    border-left: ${theme.darkBorder3};
  `}
  ${media.medium_2`
    & button {
      display: none;
    }
  `}
`;

export const StyledMessanger = styled.main<{ interlocutorsVisible: boolean }>`
  position: fixed;
  left: 0%;
  width: 100%;
  display: grid;
  border-radius: 0.3rem;
  overflow: hidden;

  ${({ theme, interlocutorsVisible }) => `
    top: ${theme.navigationHeight};
    height: calc(100vh - ${theme.navigationHeight});
    box-shadow: ${theme.lightShadow};
    grid-template-rows: max-content 1fr ${theme.messageFormHeight};
    grid-template-columns: ${
      interlocutorsVisible ? "30rem" : "max-content"
    } 1fr;
  `}

  ${({ theme }) => theme.medium_2`
    grid-template-columns: max-content 1fr;
  `}
`;

export const InterlocutorsSearch = styled.div`
  font-weight: 400;
  font-size: 1.6rem;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  ${({ theme }) => `
        background-color: ${theme.colorGreyLight5};
    `}
`;

export const InterlocutorsSearchIcon = styled(ReactSVG)`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: white;
  position: relative;

  ${({ theme }) => `
    fill: ${theme.colorGreyDark3};
  `}

  & svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export const InterlocutorsSearchTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 400;
  margin-left: 1rem;

  ${({ theme }) => theme.medium_2`
    display: none;
  `}
`;
