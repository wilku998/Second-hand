import React, { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import Chat from "./Chat/Chat";
import { getUserRequest } from "../../API/users";
import IUser from "../../interfaces/IUser";
import { IUserStore } from "../../store/user";
import {
  StyledMessanger,
  InterlocutorsSearch,
  MessangerContainer,
  MessagerStyledUserLabel,
  InterlocutorsSearchIcon,
  InterlocutorsSearchInput,
  InterlocutorsSearchTitle
} from "./styleMessanger";
import { IInterlocutorsStore } from "../../store/interlocutors";
import Interlocutors from "./Interlocutors/Interlocutors";
import UserLabel from "../UserLabel/UserLabel";
import theme from "../../styles/theme";
import {
  createMessangerRoomRequest,
  getMessangerRoomRequest
} from "../../API/messangerRooms";
import { socket } from "../../app";
import IInterlocutor from "../../interfaces/IInterlocutor";
import IMessage from "../../interfaces/IMessage";
import InvisibleButton from "../Abstracts/InvisibleButton";

interface IProps {
  match: any;
  userStore: IUserStore;
  interlocutorsStore: IInterlocutorsStore;
}
const Messanger = ({ match, userStore, interlocutorsStore }: IProps) => {
  const [interlocutor, setInterlocutor]: [
    IInterlocutor["interlocutor"],
    any
  ] = useState(undefined);
  const [messages, setMessages]: [Array<IMessage>, any] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [interlocutorsVisible, setInterlocutorsVisible] = useState(true);
  const interlocutorID = match.params.id;
  const user = userStore.getUser;
  const interlocutors = interlocutorsStore.getInterlocutors;

  let isReaded = false;
  const interlocutorFromStore = interlocutorsStore.getInterlocutor(
    interlocutorID
  );

  if (interlocutorFromStore) {
    isReaded = interlocutorFromStore.isReaded;
  }

  const onInterlocutorsButtonClick = () => {
    setInterlocutorsVisible(!interlocutorsVisible);
  };

  useEffect(() => {
    if (interlocutorFromStore) {
      setInterlocutor(interlocutorFromStore.interlocutor);
    }
  }, [interlocutorID, interlocutors]);

  useEffect(() => {
    const fetchData = async () => {
      let room;
      if (!interlocutorFromStore) {
        try {
          room = await createMessangerRoomRequest(interlocutorID);
          socket.emit("sendNewRoom", room, user._id, interlocutorID);
        } catch (e) {}
      } else {
        room = await getMessangerRoomRequest(interlocutorFromStore.roomName);
      }
      if (room) {
        setMessages(room.messages);
        setRoomName(room.roomName);
      }
    };
    fetchData();
  }, [interlocutorID]);

  const onMessage = (message: IMessage, messageRoomName: string) => {
    if (roomName === messageRoomName) {
      setMessages([...messages, message]);
    }
  };

  useEffect(() => {
    socket.on("message", onMessage);

    if (
      messages.length > 0 &&
      messages[messages.length - 1].senderID !== user._id &&
      messages[messages.length - 1].senderID === interlocutorID
    ) {
      socket.emit("sendMessageReaded", roomName);
    }

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
        isReaded={isReaded}
        user={user}
        interlocutor={interlocutor}
        messages={messages}
        roomName={roomName}
        interlocutorsVisible={interlocutorsVisible}
      />
    </StyledMessanger>
  );
};

export default inject("userStore", "interlocutorsStore")(observer(Messanger));
