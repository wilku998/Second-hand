import styled from "styled-components";
import Button_2 from "../Abstracts/Button_2";

export const StyledUserLabel = styled.div<{ additionalStyles?: string }>`
  display: flex;
  align-items: center;
  padding: 0.7rem 2rem;
  ${({ theme, additionalStyles }) => `
    background-color: ${theme.colorGreyLight1};
    ${additionalStyles ? additionalStyles : ""}
  `}
`;

export const Button = styled(Button_2)`
  margin-left: 2rem;
  font-size: 1.2rem;
  line-height: 1.15;
`;

export const Name = styled.h3`
  font-size: 1.4rem;
  font-weight: 400;
  margin-right: auto;
`;
