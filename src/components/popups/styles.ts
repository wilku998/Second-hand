import reactModalStyles from "../../styles/reactModalStyles";
import styled from "styled-components";
import Button_2 from "../Abstracts/Button_2";

export default {
  ...reactModalStyles,
  content: {
    ...reactModalStyles.content,
    width: "35rem"
  }
};

export const ErrorMessage = styled.span`
  margin-top: -0.5rem;
  ${({ theme }) => `
        color: ${theme.colorRed};
    `}
`;
