import { userStore, history, interlocutorsStore } from "../app";
import { getInterlocutorsRequest } from "./messangerRooms";
import { cleanUserIDSocket, leaveRoomSocket, setUserIDSocket } from "../sockets";
import { IProfile } from "../interfaces/IUser";

export const parseResponse = (response: any) =>
  !response || Object.keys(response).length === 0 || response.error
    ? undefined
    : response;

export const setUserStore = async (data: IProfile) => {
  if (parseResponse(data.user)) {
    userStore.user = data.user;
    setUserIDSocket(data.user._id)
  }
  if (parseResponse(data.ownItems)) {
    userStore.ownItems = data.ownItems;
  }
  await getInterlocutorsRequest();
};

export const clearUserAndInterlocutorsStores = () => {
  userStore.user = undefined;
  userStore.ownItems = [];
  cleanSockets();
  interlocutorsStore.interlocutors = [];
};

export const cleanSockets = () => {
  cleanUserIDSocket();
  interlocutorsStore.getInterlocutors.forEach(
    (interlocutor) => {
      leaveRoomSocket(interlocutor.roomName)
    }
  );
};

export const onlyAuthRequest = async (request: any) => {
  const user = userStore.getUser;
  if (!user) {
    history.push("/login");
  } else {
    await request();
  }
};
