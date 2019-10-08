import fetchData from "./fetchData";
import { interlocutorsStore } from "../app";
import ajax from "./ajax";
import { joinRoomSocket } from "../sockets";

export const getInterlocutorsRequest = async () => {
  try {
    const interlocutors = await fetchData(
      "",
      "/api/messangerRooms/interlocutors"
    );
    if (interlocutors) {
      interlocutors.forEach(interlocutor => {
        joinRoomSocket(interlocutor.roomName);
      });
      interlocutorsStore.interlocutors = interlocutors;
    }
    return interlocutors;
  } catch (e) {}
};

export const getMessages = async (
  roomName: string,
  skip: number,
  limit: number
) =>
  await fetchData(
    `${roomName}?skip=${skip}&limit=${limit}`,
    "/api/messangerRooms/messages/"
  );

export const createMessangerRoomRequest = async (interlocutorID: string) =>
  await ajax("POST", "/api/messangerRooms", { interlocutorID }, 201);
