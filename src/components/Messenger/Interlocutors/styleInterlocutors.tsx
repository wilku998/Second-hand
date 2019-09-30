import { FunctionComponent } from "react";
import styled from "styled-components";
import { IProps } from "./Interlocutors";
import { Link } from "react-router-dom";
import media from '../../../styles/media';

export default (Interlocutors: FunctionComponent<IProps>) => styled(
  Interlocutors
)`
  ${({ theme }) => `
    background-color: ${theme.colorGreyLight1};
    border-top: ${theme.darkBorder3};
  `}

  ${media.medium`
    display: none;
  `}
`;

export const InterlocutorsContainer = styled.div`
  padding: 0 2rem;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

export const Interlocutor = styled(Link)`
  height: initial;
  padding: 1rem 0;
  cursor: pointer;
  &:not(:last-child) {
    ${({ theme }) => `
        border-bottom: ${theme.darkBorder3};
    `}
  }
`;

export const LastMessage = styled.p<{ isUnreaded: boolean }>`
  display: block;
  line-height: 1;
  font-size: 1.3rem;
  margin-top: 0.5rem;
  word-break: break-word;
  ${({ theme, isUnreaded }) => `
        color: ${isUnreaded ? theme.colorGreyDark4 : theme.colorGreyDark5};
    `}
`;

export const User = styled.div`
  display: flex;
  align-items: center;
`;

export const NoMessages = styled.span`
  display: block;
  text-align: center;
  margin-top: 2rem;
  font-size: 1.2rem;
`;
