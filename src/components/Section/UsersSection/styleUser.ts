import styled from "styled-components";
import Button_2 from '../../Abstracts/Button_2';

export const Button = styled(Button_2)`
  grid-column: 1/2;
`;

export const UserLabel = styled.div`
  display: flex;
  align-items: center;
  padding: 0.7rem 1rem;
  grid-column: 1/5;
  margin-bottom: 2rem;
  ${({ theme }) => `
    background-color: ${theme.colorWhiteTransparent};
  `}
`;

export const Info = styled.span`
  display: flex;
  align-items: flex-end;
  & > h3 {
    font-size: inherit;
  }
  & > span {
    margin-left: 1.5rem;
  }
`;
