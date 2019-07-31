import styled from "styled-components";
import Button_2 from "../Abstracts/Button_2";

export const Content = styled.div`
  padding: 2rem;
  width: 40rem;
  border-radius: 0.3rem;
  box-shadow: 0 2rem 2rem rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;

  ${({ theme }) => `
        background-color: ${theme.colorGreyLight1};
    `}
`;

export const Container = styled.div`
  height: calc(100vh - 4.5rem);
  display: flex;
  justify-content: center;
  align-items: center;
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
  color: ${({theme}) => theme.colorRed}
`