import styled from "styled-components";
import { FunctionComponent } from "react";
import { IProps } from "./Login";
import Button_2 from "../Abstracts/Button_2";

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  & label {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  & input {
    margin-left: 1rem;
  }

  & > * {
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
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
    `}
`;
export const Input = styled.input<{valid: boolean, isRegister: boolean}>`
  padding: 0.3rem 1rem;
  flex: 1;
  ${({theme, valid, value, isRegister}) => `
    ${value !== '' && isRegister ? `
      background-color: ${valid ? theme.colorGreenLight : theme.colorRedLight};
    ` : ''}
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
