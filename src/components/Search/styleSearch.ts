import styled from "styled-components";
import InvisibleButton from "../Abstracts/InvisibleButton";
import ReactSVG from "react-svg";

export const StyledSearch = styled.main`
  display: flex;
  flex-direction: column;
  margin: 4rem auto 0 auto;
  border-radius: 0.3rem;
  ${({ theme }) => `
    max-width: ${theme.rowWidth};
  `}
`;
