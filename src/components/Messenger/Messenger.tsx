import React, { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { observer, inject } from "mobx-react";
import { socket } from "../../app";
import { IUserStore } from "../../store/user";
import { getUserRequest } from "../../API/users";
import IUser from "../../interfaces/IUser";
import IMessage from "../../interfaces/IMessage";
import { IInterlocutorsStore } from "../../store/interlocutors";
import {
  createMessangerRoomRequest,
  getMessangerRoomRequest
} from "../../API/messangerRooms";

interface IProps {
  match: any;
  userStore: IUserStore;
  interlocutorsStore: IInterlocutorsStore;
}

const Messenger = ({ match, userStore, interlocutorsStore }: IProps) => {
  const user = userStore.getUser;
  const interlocutorID = match.params.id;
  const [interlocutor, setInterlocutor]: [IUser, any] = useState(undefined);
  const [messages, setMessages]: [Array<IMessage>, any] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [message, setMessage] = useState("");

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

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUser = await getUserRequest(interlocutorID);
      if (fetchedUser) {
        setInterlocutor(fetchedUser.user);
        const interlocutors = interlocutorsStore.getInterlocutors;
        const indexOfInterlocutor = interlocutors.findIndex(
          e => e.interlocutor._id === interlocutorID
        );

        let room;
        if (indexOfInterlocutor === -1) {
          room = await createMessangerRoomRequest(interlocutorID);
          setRoomName(room.roomName)
          socket.emit("sendNewRoom", room, user._id, interlocutorID);
        } else {
          room = await getMessangerRoomRequest(
            interlocutors[indexOfInterlocutor].roomName
          );
        }
        if (room) {
          setMessages(room.messages);
          setRoomName(room.roomName);
        }
      }
    };
    fetchData();
  }, [interlocutorID]);

  const onMessageReaded = () => {
    console.log("messageReaded");
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
      console.log("message");
    }
  };

  useEffect(() => {
    socket.on("message", onMessage);
    if (
      roomName &&
      messages.length > 0 &&
      messages[messages.length - 1].senderID !== user._id
    ) {
      console.log("This user readed message");
      socket.emit("sendMessageReaded", roomName);
    }
    return () => {
      socket.off("message", onMessage);
    };
  }, [messages, roomName]);

  return (
    <main>
      {interlocutor ? (
        <div>
          <h3>Kontaktujesz sie z użytkownikiem {interlocutor.name}</h3>
          <form onSubmit={onSubmit}>
            <input type="text" value={message} onChange={onInputChange} />
            <button>wyślij wiadomość</button>
          </form>
          {messages.map((e, i) => (
            <div key={i}>
              {e.message} - wysłał:{" "}
              {e.senderID === user._id ? "Ty" : interlocutor.name}
            </div>
          ))}
        </div>
      ) : (
        <span>użytkownik nie został odnaleziony</span>
      )}
    </main>
  );
};

export default inject("userStore", "interlocutorsStore")(observer(Messenger));
