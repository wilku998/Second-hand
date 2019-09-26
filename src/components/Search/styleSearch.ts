import styled from "styled-components";
import InvisibleButton from "../Abstracts/InvisibleButton";
import ReactSVG from "react-svg";
import media from "../../styles/media";

export const StyledSearch = styled.main`
  display: flex;
  flex-direction: column;
  margin: 2rem auto 0 auto;
  border-radius: 0.3rem;
  ${({ theme }) => `
    width: ${theme.rowWidth};
  `}
  ${media.big`
    width: 100%;
  `}
`;
