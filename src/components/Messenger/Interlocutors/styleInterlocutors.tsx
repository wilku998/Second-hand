import { FunctionComponent } from "react";
import styled from "styled-components";
import { IProps } from "./Interlocutors";
import { Link } from "react-router-dom";
import Avatar from "../../Abstracts/Avatar";

export const InterlocutorsContainer = styled.section<{ interlocutorsVisible }>`
  position: relative;
  grid-column: 1/2;
  grid-row: 2/4;
  overflow: auto;
  ${({ theme, interlocutorsVisible }) => theme.medium_2`
    ${
      interlocutorsVisible
        ? `
          overflow: initial;
        `
        : ""
    }
  `}
`;

export const InterlocutorsContent = styled.div<{
  interlocutorsVisible: boolean;
}>`
  overflow-y: auto;
  overflow-x: visible;
  height: 100%;
  ${({ theme }) => `
    background-color: ${theme.colorGreyLight1};
    border-top: ${theme.darkBorder3};
  `}
  ${({ theme, interlocutorsVisible }) => theme.medium_2`
    ${
      interlocutorsVisible
        ? `
      position: absolute;
      top: 0;
      left: 0;
      width: 30rem;
      border-right: ${theme.darkBorder3};
    `
        : ""
    }
  `}
`;

export const InterlocutorsList = styled.ul`
  padding: 0 2rem;
`;

export const Interlocutor = styled.li`
  &:not(:last-child) {
    ${({ theme }) => `
        border-bottom: ${theme.darkBorder3};
    `}
  }
  & > a {
    padding: 1rem 0;
    height: initial;
    width: 100%;
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

export const NoMessages = styled.li`
  text-align: center;
  margin-top: 2rem;
  font-size: 1.2rem;
`;

export const InterlocutorAvatar = styled(Avatar)<{
  interlocutorsVisible: boolean;
}>`
  ${({ interlocutorsVisible }) => `
    margin-right: ${interlocutorsVisible ? "1rem" : "0"};
  `}
`;

export const MobileBackground = styled.div<{ interlocutorsVisible }>`
  position: absolute;
  z-index: 100;
  top: 0;
  left: 30rem;
  height: 100%;
  width: 100vw;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.8),
    rgba(0, 0, 0, 0.7) 2rem
  );
  display: none;

  ${({ theme, interlocutorsVisible }) => theme.medium_2`
    ${
      interlocutorsVisible
        ? `
          display: block;
        `
        : ""
    }
  `}
`;

export const InterlocutorsSearchInputContainer = styled.div`
  padding: 1rem;
  display: flex;

  ${({ theme }) => `
    border-bottom: ${theme.darkBorder3};
    background-color: ${theme.colorGreyLight4};
  `}
`;

export const InterlocutorsSearchInput = styled.input`
  height: initial;
  flex: 1;
  padding: 0.35rem 1rem;
`;
