import { userStore, history, interlocutorsStore, socket } from "../app";
import { IInterlocutorsStore } from "../store/interlocutors";
import { getInterlocutorsRequest } from "./messangerRooms";

export const parseResponse = (response: any) =>
  !response || Object.keys(response).length === 0 || response.error
    ? undefined
    : response;

export const setUserStore = async (data: any) => {
  if (parseResponse(data.user)) {
    userStore.user = data.user;
    socket.emit("setUserID", data.user._id);
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
  socket.emit("cleanUserID");
  interlocutorsStore.getInterlocutors.forEach(
    (interlocutor: IInterlocutorsStore["interlocutors"][0]) => {
      socket.emit("leave", interlocutor.roomName);
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
