import styled from "styled-components";
import media from "../../styles/media";
import Button_1 from "../Abstracts/Button_1";

export const StyledUserLabel = styled.div<{ additionalStyles?: string }>`
  display: flex;
  align-items: center;
  padding: 0.7rem 2rem;
  ${({ theme, additionalStyles }) => `
    background-color: ${theme.colorGreyLight1};
    ${additionalStyles ? additionalStyles : ""}
    border: ${theme.lightBorder1};
  `}

  ${media.small`
    flex-direction: column;
    align-items: stretch;
    padding: 0.7rem 1rem;
  `}
`;

export const Button = styled(Button_1)`
  margin-left: 2rem;
  font-size: 1.2rem;
  line-height: 1.15;
  ${media.small`
    margin-left: 0;
    margin-top: .7rem;
  `}
`;

export const Name = styled.h3`
  font-size: 1.4rem;
  font-weight: 400;
  margin-right: auto;
`;

export const NameContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
`;
