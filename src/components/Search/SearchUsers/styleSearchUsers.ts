import styled from "styled-components";
import media from "../../../styles/media";

export const SearchMenu = styled.nav``;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 1rem 2rem;
  background-color: white;

  ${({ theme }) => `
    border: ${theme.lightBorder2};
  `}

  ${media.medium_2`
    flex-direction: column;
    align-items: stretch;
  `}
`;

export const NameInput = styled.input`
  padding: 0.5rem 1rem;
  margin-right: 2rem;
  height: initial;

  ${({ theme }) => `
    background-color: ${theme.colorGreyLight2};
  `}

  ${media.medium_2`
    margin-right: 0;
    margin-bottom: .7rem;
    flex: 1;
  `};
`;
