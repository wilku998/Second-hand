import React, {
  useState,
  FormEvent,
  ChangeEvent,
  Fragment,
  useRef,
  useLayoutEffect
} from "react";
import { socket } from "../../../app";
import IUser from "../../../interfaces/IUser";
import IMessage from "../../../interfaces/IMessage";

import {
  Messages,
  Message,
  StyledChat,
  Form,
  SendButton,
  MessageInput,
  FormContent,
  SendedBy,
  Info
} from "./styleChat";
import ReactSVG from "react-svg";
import parseDate from "../../../functions/parseDate";
import IInterlocutor from "../../../interfaces/IInterlocutor";

interface IProps {
  user: IUser;
  interlocutor: IInterlocutor["interlocutor"];
  roomName: string;
  messages: IMessage[];
  isReaded: boolean;
  interlocutorsVisible: boolean;
}

const Chat = ({
  user,
  interlocutor,
  roomName,
  messages,
  isReaded,
  interlocutorsVisible
}: IProps) => {
  const [message, setMessage] = useState("");
  const messagesRef = useRef();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message) {
      setMessage("");
      socket.emit("sendMessage", { message, roomName, senderID: user._id });
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const dates: number[] = [];

  const shouldRenderDate = (message: IMessage, messageBefore: IMessage) => {
    const sendedAt = parseInt(message.sendedAt);
    const lastDate = dates[dates.length - 1];
    if (
      sendedAt - lastDate > 3600000 ||
      !messageBefore ||
      message.senderID !== messageBefore.senderID
    ) {
      dates.push(sendedAt);
      return true;
    }
    return false;
  };

  useLayoutEffect(() => {
    const messagesElement: any = messagesRef.current;
    messagesElement.scrollTop =
      messagesElement.scrollHeight - messagesElement.clientHeight;
  }, [messages, roomName]);

  return (
    <>
      <StyledChat>
        <Messages ref={messagesRef}>
          {messages.map((e, i) => (
            <Fragment key={e.message + e.sendedAt}>
              {shouldRenderDate(e, messages[i - 1]) && (
                <Info>{parseDate(e.sendedAt)}</Info>
              )}
              {e.senderID === user._id ? (
                <Message isOwn={true}>{e.message}</Message>
              ) : (
                <>
                  <Message isOwn={false}>{e.message}</Message>
                  <SendedBy>Wysłane przez {interlocutor.name}</SendedBy>
                </>
              )}
              {messages.length - 1 === i && (
                <Info>
                  Wiadomość
                  {isReaded ? " przeczytana" : " nieprzeczytana"}
                </Info>
              )}
            </Fragment>
          ))}
        </Messages>
      </StyledChat>
      <Form onSubmit={onSubmit} interlocutorsVisible={interlocutorsVisible}>
        <FormContent>
          <MessageInput
            disabled={!interlocutor}
            type="text"
            value={message}
            onChange={onInputChange}
          />
          <SendButton disabled={!interlocutor}>
            <ReactSVG src="/svg/send.svg" />
          </SendButton>
        </FormContent>
      </Form>
    </>
  );
};

export default Chat;
