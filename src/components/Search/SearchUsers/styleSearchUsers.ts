import styled from "styled-components";
import media from "../../../styles/media";

export const SearchMenu = styled.nav`
  margin-bottom: 2rem;
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.7rem 2rem;
  ${({ theme }) => `
    background-color: ${theme.colorGreyLight1};
    border: ${theme.lightBorder2};
  `}

  ${media.medium_2`
    flex-direction: column;
    align-items: stretch;
  `}
`;

export const NameInput = styled.label`
  display: flex;
  & > input {
    margin-left: 1rem;
  }

  ${media.medium_2`
    margin-bottom: .7rem;
    & > input {
      flex: 1;
    }
  `};

  ${media.tiny`
    text-align: center;
    flex-direction: column;
    & > input{
      margin-left: 0;
      padding: .3rem 1rem;
    }
  `}
`;
