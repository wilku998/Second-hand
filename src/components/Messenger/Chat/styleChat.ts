import styled from "styled-components";
import Button_2 from "../../Abstracts/Button_2";

export const StyledChat = styled.section`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  grid-row: 2/3;
  grid-column: 2/3;
  ${({ theme }) => `
    border-top: ${theme.darkBorder3};
    border-left: ${theme.darkBorder3};
  `}
`;

export const Messages = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: white;
  word-break: break-word;
  overflow: auto;
  flex: 1;
`;

export const Message = styled.span<{ isOwn: boolean }>`
  color: white;
  padding: 0.3rem 1rem;
  border-radius: 1rem;
  &:not(:last-child) {
    margin-bottom: 0.2rem;
  }

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

export const Form = styled.form<{interlocutorsVisible: boolean}>`
  padding: 0.5rem 2rem;
  grid-row: 3/4;
  grid-column: 2/3;

  ${({ theme }) => `
    border-top: ${theme.darkBorder3};
    background-color: ${theme.colorGreyLight5};
  `}
  ${({ theme, interlocutorsVisible }) => theme.medium_2`
    ${
      interlocutorsVisible
        ? `
        grid-column: 1/4;
        `
        : ""
    }
  `}
`;

export const SendButton = styled(Button_2)`
  position: relative;
  height: 2.5rem;
  width: 2.5rem;
  margin-left: -2.5rem;
  border: none;
  ${({ theme }) => `
    border-left: ${theme.darkBorder3};
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
  margin-top: -0.7rem;
  margin-bottom: 1rem;
`;

export const Info = styled.span`
  margin-top: 0.3rem;
  text-align: center;
  font-size: 1.2rem;
`;
