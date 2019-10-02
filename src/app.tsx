import "normalize.css";
import io from "socket.io-client";
import * as React from "react";
import { render } from "react-dom";
import { ThemeProvider } from "styled-components";
import { createBrowserHistory } from "history";
import { Provider } from "mobx-react";
import theme from "./styles/theme";
import GlobalStyles from "./styles/GlobalStyles";
import AppRouter from "./routers/AppRouter";
import { getProfileRequest } from "./API/users";
import UserStore from "./store/user";
import ViewStore from "./store/view";
import InterlocutorsStore from "./store/interlocutors";
import IMessage from "./interfaces/IMessage";
import IUser from "./interfaces/IUser";
import IInterlocutor from "./interfaces/IInterlocutor";
import media from "./styles/media";

export const socket = io();

socket.on("newInterlocutor", (interlocutor: IInterlocutor) => {
  socket.emit("join", interlocutor.roomName);
  interlocutorsStore.addInterlocutor(interlocutor);
});

socket.on("message", (newMessage: IMessage, roomName: string) => {
  interlocutorsStore.interlocutors = interlocutorsStore.getInterlocutors.map(
    e => ({
      ...e,
      isReaded: false,
      lastMessage: e.roomName === roomName ? newMessage : e.lastMessage
    })
  );
});

socket.on("likeItem", ({ itemID, user }: { itemID: string; user: IUser }) => {
  userStore.ownItemLikedBySomeone(itemID, user);
});

socket.on("unlikeItem", ({ itemID, user }: { itemID: string; user: IUser }) => {
  userStore.ownItemUnlikedBySomeone(itemID, user._id);
});

socket.on("follow", (userID: string) => {
  userStore.addToArray("followedBy", userID);
});

socket.on("unfollow", (userID: string) => {
  userStore.removeFromArray("followedBy", userID);
});

socket.on("notification", (notification: any) => {
  userStore.addToArray("notifications", notification);
});

socket.on("messageReaded", (roomName: string) => {
  interlocutorsStore.readMessage(roomName);
});

export const userStore = new UserStore();
export const viewStore = new ViewStore();
export const interlocutorsStore = new InterlocutorsStore();

const stores = {
  userStore,
  viewStore,
  interlocutorsStore
};

const start = async () => {
  await getProfileRequest();
  renderApp();
};

start();

const themeWithMedia = { ...theme, ...media };
console.log(themeWithMedia);

export const history = createBrowserHistory();
const app = (
  <ThemeProvider theme={themeWithMedia}>
    <Provider {...stores}>
      <div>
        <GlobalStyles />
        <AppRouter history={history} />
      </div>
    </Provider>
  </ThemeProvider>
);

const renderApp = () => render(app, document.getElementById("root"));
