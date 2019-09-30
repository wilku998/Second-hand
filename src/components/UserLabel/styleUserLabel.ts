import styled from "styled-components";
import media from "../../styles/media";
import Button_2 from "../Abstracts/Button_2";

export const StyledUserLabel = styled.div`
  display: flex;
  align-items: center;
  padding: 0.7rem 2rem;
  border-radius: 0.3rem;
  margin-bottom: 2rem;

  ${({ theme }) => `
    background-color: ${theme.colorGreyLight5};
    box-shadow: ${theme.lightShadow2};
  `}

  ${media.medium_2`
    flex-direction: column;
    align-items: stretch;
    padding: 0.7rem 1rem;
  `}
`;

export const Button = styled(Button_2)`
  margin-left: 2rem;
  font-size: 1.2rem;
  line-height: 1.15;
  ${media.medium_2`
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
