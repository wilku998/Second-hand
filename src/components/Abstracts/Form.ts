import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  & > * {
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`;

export const FormInput = styled.input<{ valid: boolean }>`
  ${({ theme, valid, value }) => `
    ${
      value !== ""
        ? `
          background-color: ${
            valid ? theme.colorGreenLight : theme.colorRedLight
          };
        `
        : ""
    }
  `};
`;

export const Label = styled.label<{ isColumn?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  & input,
  select {
    margin-left: 1rem;
  }

  ${({ isColumn }) =>
    isColumn
      ? `flex-direction: column;
        align-items: stretch;
        & input, select{margin-left: 0; flex-basis: 2rem;}`
      : ""}
`;
