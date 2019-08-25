import fetchData from "./fetchData";
import { interlocutorsStore, socket, userStore } from "../app";
import { IInterlocutorsStore } from "../store/interlocutors";
import { cleanSockets } from "./functions";
import ajax from "./ajax";

export const getInterlocutorsRequest = async () => {
  const interlocutors = await fetchData(
    "",
    "/api/messangerRooms/interlocutors"
  );
  if (interlocutors) {
    interlocutors.forEach(
      (lastMessage: IInterlocutorsStore["interlocutors"][0]) => {
        socket.emit("join", lastMessage.roomName);
      }
    );
    interlocutorsStore.interlocutors = interlocutors;
  }
  return interlocutors;
};

export const getMessangerRoomRequest = async (roomName: string) =>
  await fetchData(roomName, "/api/messangerRooms/");

export const createMessangerRoomRequest = async (interlocutorID: string) => 
  await ajax("POST", "/api/messangerRooms", { interlocutorID }, 201);
