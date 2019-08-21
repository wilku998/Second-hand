import React, { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { observer, inject } from "mobx-react";
import { socket } from "../../app";
import { IUserStore } from "../../store/user";
import { getUserRequest } from "../../API/users";
import IUser from "../../interfaces/IUser";

interface IProps {
  match: any;
  userStore: IUserStore;
}

const Messenger = ({ match, userStore }: IProps) => {
  const user = userStore.getUser;
  const userToContactID = match.params.id;
  const [userToContact, setUserToContact]: [IUser, any] = useState(undefined);
  const [messages, setMessages]: [
    Array<{ message: string; sender: string; sendedAt: string }>,
    any
  ] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [message, setMessage] = useState("");

  socket.on("message", (message: string) => {
    setMessages([...messages, message]);
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message) {
      setMessage("");
      socket.emit("sendMessage", { message, roomName, sender: user._id });
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUser = await getUserRequest(userToContactID);
      if (fetchedUser) {
        setUserToContact(fetchedUser.user);
        socket.emit("join", [user._id, userToContactID]);
        socket.on("roomName", (roomName: string) => {
          console.log(roomName + "x");
          setRoomName(roomName);
        });
      }
    };
    fetchData();
  }, [userToContactID]);
  return (
    <main>
      {userToContact ? (
        <div>
          <h3>Kontaktujesz sie z użytkownikiem {userToContact.name}</h3>
          <form onSubmit={onSubmit}>
            <input type="text" onChange={onInputChange} />
            <button>wyślij wiadomość</button>
          </form>
          {messages.map((e, i) => (
            <div key={i}>{e.message} - {e.sender}</div>
          ))}
        </div>
      ) : (
        <span>użytkownik nie został odnaleziony</span>
      )}
    </main>
  );
};

export default inject("userStore")(observer(Messenger));
