import styled from "styled-components";
import Button_2 from "../../Abstracts/Button_2";
import { Link } from "react-router-dom";

export const StyledChat = styled.section`
  display: flex;
  flex-direction: column;
  ${({ theme }) => `
        border: ${theme.lightBorder2};
    `}
`;

export const Messages = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: white;
  word-break: break-word;
  overflow: auto;
  ${({theme}) => `
    flex: 0 0 ${theme.chatHeight};
  `}
`;

export const Message = styled.span<{ isOwn: boolean }>`
  color: white;
  padding: 0.3rem 1rem;
  border-radius: 1rem;
  margin-bottom: 1rem;

  ${({ theme, isOwn }) => `
        ${
          isOwn
            ? `
                align-self: flex-start
                background-color: ${theme.colorBlue4};
                `
            : `
                align-self: flex-end
                background-color: ${theme.colorGreyDark2};
            `
        }
    `}
`;

export const Form = styled.form`
  padding: 0.5rem 2rem;
  height: 4rem;
  ${({ theme }) => `
        border-top: ${theme.lightBorder2};
        background-color: ${theme.colorGreyLight1};
    `}
`;

export const SendButton = styled(Button_2)`
  position: relative;
  height: 2.5rem;
  width: 2.5rem;
  margin-left: -2.5rem;
  border: none;
  ${({ theme }) => `
    border-left: ${theme.lightBorder2};
  `}

  & svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1.5rem;
    fill: white;
  }
`;

export const MessageInput = styled.input`
  height: initial;
  border: none;
`;

export const FormContent = styled.div`
  display: flex;
  border-radius: 0.3rem;
  ${({ theme }) => `
    border: ${theme.lightBorder2};
  `}
`;

export const SendedBy = styled.span`
  align-self: flex-end;
  font-size: 1rem;
  margin-top: -.7rem;
  margin-bottom: 1rem;
`;