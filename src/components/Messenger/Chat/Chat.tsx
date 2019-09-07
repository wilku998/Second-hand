import React, {
  useEffect,
  useState,
  FormEvent,
  ChangeEvent,
  Fragment,
  useRef,
  useLayoutEffect
} from "react";
import { observer, inject } from "mobx-react";
import { socket } from "../../../app";
import IUser from "../../../interfaces/IUser";
import IMessage from "../../../interfaces/IMessage";
import { IInterlocutorsStore } from "../../../store/interlocutors";
import {
  createMessangerRoomRequest,
  getMessangerRoomRequest
} from "../../../API/messangerRooms";
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

interface IProps {
  messsageReaded: boolean;
  user: IUser;
  interlocutor: IUser;
  interlocutorsStore?: IInterlocutorsStore;
}

const Chat = ({
  user,
  interlocutor,
  interlocutorsStore,
  messsageReaded
}: IProps) => {
  const [messages, setMessages]: [Array<IMessage>, any] = useState([]);
  const [roomName, setRoomName] = useState("");
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
    if (interlocutor) {
      const fetchData = async () => {
        const interlocutors = interlocutorsStore.getInterlocutors;
        const indexOfInterlocutor = interlocutors.findIndex(
          e => e.interlocutor._id === interlocutor._id
        );

        let room;
        if (indexOfInterlocutor === -1) {
          room = await createMessangerRoomRequest(interlocutor._id);
          setRoomName(room.roomName);
          socket.emit("sendNewRoom", room, user._id, interlocutor._id);
        } else {
          room = await getMessangerRoomRequest(
            interlocutors[indexOfInterlocutor].roomName
          );
        }
        if (room) {
          setMessages(room.messages);
          setRoomName(room.roomName);
          const messagesElement: any = messagesRef.current;
          messagesElement.scrollTop = messagesElement.scrollHeight - messagesElement.clientHeight
        }
      };
      fetchData();
    }
  }, [interlocutor]);

  const onMessageReaded = () => {
    interlocutorsStore.interlocutors = interlocutorsStore.getInterlocutors.map(
      interlocutor => ({
        ...interlocutor,
        isReaded: true
      })
    );
  };

  useEffect(() => {
    socket.on("messageReaded", onMessageReaded);
    return () => {
      socket.off("messageReaded", onMessageReaded);
    };
  }, [messages]);

  const onMessage = (message: IMessage, messageRoomName: string) => {
    if (roomName === messageRoomName) {
      setMessages([...messages, message]);
    }
  };

  useEffect(() => {
    socket.on("message", onMessage);
    if (
      roomName &&
      messages.length > 0 &&
      messages[messages.length - 1].senderID !== user._id
    ) {
      socket.emit("sendMessageReaded", roomName);
    }
    return () => {
      socket.off("message", onMessage);
    };
  }, [messages, roomName]);

  return (
    <StyledChat>
      <Messages ref={messagesRef}>
        {interlocutor && (
          <>
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
                    {messsageReaded ? " przeczytana" : " nieprzeczytana"}
                  </Info>
                )}
              </Fragment>
            ))}
          </>
        )}
      </Messages>
      <Form onSubmit={onSubmit}>
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
    </StyledChat>
  );
};

export default inject("userStore", "interlocutorsStore")(observer(Chat));
