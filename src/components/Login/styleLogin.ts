import styled from "styled-components";
import Button_2 from "../Abstracts/Button_2";
import media from "../../styles/media";

export const LoginContainer = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  ${({theme}) => `
    min-height: calc(100vh - ${theme.navigationHeight} - ${theme.footerMarginTop});
  `}
`;

export const Content = styled.div`
  padding: 2rem;
  width: 40rem;
  border-radius: 0.3rem;
  box-shadow: 0 2rem 2rem rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;

  ${({ theme }) => `
    background-color: ${theme.colorGreyLight1};
    border: ${theme.lightBorder2};
  `}

  ${media.tiny`
    width: 100%;
  `}
`;

export const Button = styled(Button_2)`
  &:first-of-type {
    margin-top: 1rem;
  }
`;

export const RadioGroup = styled.div`
  display: flex;

  & > label {
    &:not(:first-child) {
      margin-left: 2rem;
    }
  }
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colorRed};
`;
