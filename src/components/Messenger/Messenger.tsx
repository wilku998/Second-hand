import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { inject, observer } from "mobx-react";
import Chat from "./Chat/Chat";
import { IUserStore } from "../../store/user";
import {
  StyledMessanger,
  InterlocutorsSearch,
  MessagerStyledUserLabel,
  InterlocutorsSearchIcon,
  InterlocutorsSearchTitle
} from "./styleMessanger";
import { IInterlocutorsStore } from "../../store/interlocutors";
import Interlocutors from "./Interlocutors/Interlocutors";
import UserLabel from "../UserLabel/UserLabel";
import {
  createMessangerRoomRequest,
  getMessages
} from "../../API/messangerRooms";
import IInterlocutor from "../../interfaces/IInterlocutor";
import IMessage from "../../interfaces/IMessage";
import InvisibleButton from "../Abstracts/InvisibleButton";
import { sendMessageReadedSocket, sendNewRoomSocket } from "../../sockets";
import { socket } from "../../socket";

interface IProps {
  match: any;
  userStore: IUserStore;
  interlocutorsStore: IInterlocutorsStore;
}
const Messanger = ({ match, userStore, interlocutorsStore }: IProps) => {
  const messagesRef = useRef();
  const [interlocutor, setInterlocutor]: [
    IInterlocutor["interlocutor"],
    any
  ] = useState(undefined);
  const [messages, setMessages]: [Array<IMessage>, any] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [interlocutorsVisible, setInterlocutorsVisible] = useState(false);
  const interlocutorID = match.params.id;
  const user = userStore.getUser;
  const interlocutors = interlocutorsStore.getInterlocutors;
  const messagesLimit = 20;

  const interlocutorFromStore = interlocutorsStore.getInterlocutor(
    interlocutorID
  );

  if (interlocutorFromStore) {
    var isReaded = interlocutorFromStore.isReaded;
  }

  const onInterlocutorsButtonClick = () => {
    setInterlocutorsVisible(!interlocutorsVisible);
  };

  const loadMessages = async () => {
    const newMessages = await getMessages(
      interlocutorFromStore.roomName,
      messages.length,
      messagesLimit
    );
    setMessages([...newMessages.messages, ...messages]);
  };

  const scrollChatToBottom = () => {
    const messagesElement: any = messagesRef.current;
    messagesElement.scrollTop =
      messagesElement.scrollHeight - messagesElement.clientHeight;
  };

  useEffect(() => {
    if (interlocutorFromStore) {
      setInterlocutor(interlocutorFromStore.interlocutor);
    }
  }, [interlocutorID, interlocutors]);

  useEffect(() => {
    const fetchData = async () => {
      if (!interlocutorFromStore) {
        try {
          const room = await createMessangerRoomRequest(interlocutorID);
          sendNewRoomSocket(room, interlocutorID);
          setRoomName(room.roomName);
        } catch (e) {}
      } else {
        const messages = await getMessages(
          interlocutorFromStore.roomName,
          0,
          messagesLimit
        );
        if(interlocutorFromStore.lastMessage.senderID === interlocutorID){
          sendMessageReadedSocket(interlocutorFromStore.roomName);
        }
        setRoomName(interlocutorFromStore.roomName);
        setMessages(messages.messages);
        scrollChatToBottom();
      }
    };
    fetchData();
  }, [interlocutorID]);

  const onMessage = (message: IMessage, messageRoomName: string) => {
    if (roomName === messageRoomName) {
      console.log(message);
      if(message.senderID === interlocutorID){
        console.log('on messeage readed');
        sendMessageReadedSocket(roomName);
      }
      setMessages([...messages, message]);
      scrollChatToBottom();
    }
  };

  useLayoutEffect(() => {
    socket.on("message", onMessage);
    return () => {
      socket.off("message", onMessage);
    };
  }, [messages, roomName]);

  return (
    <StyledMessanger interlocutorsVisible={interlocutorsVisible}>
      <InterlocutorsSearch>
        <InvisibleButton onClick={onInterlocutorsButtonClick}>
          <InterlocutorsSearchIcon src="/svg/search.svg" />
        </InvisibleButton>
        {interlocutorsVisible && (
          <InterlocutorsSearchTitle>Twoje rozmowy</InterlocutorsSearchTitle>
        )}
      </InterlocutorsSearch>
      <UserLabel
        baseStyledComponent={MessagerStyledUserLabel}
        user={interlocutor}
      />
      <Interlocutors
        onInterlocutorsButtonClick={onInterlocutorsButtonClick}
        interlocutorsVisible={interlocutorsVisible}
        interlocutors={interlocutorsStore.getSortedAndFilteredInterlocutors}
      />
      <Chat
        ref={messagesRef}
        isReaded={isReaded}
        user={user}
        interlocutor={interlocutor}
        messages={messages}
        roomName={roomName}
        interlocutorsVisible={interlocutorsVisible}
        loadMessages={loadMessages}
      />
    </StyledMessanger>
  );
};

export default inject("userStore", "interlocutorsStore")(observer(Messanger));
