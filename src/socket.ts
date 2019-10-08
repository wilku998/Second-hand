import io from "socket.io-client";
import IMessage from "./interfaces/IMessage";
import IInterlocutor from "./interfaces/IInterlocutor";
import { interlocutorsStore, userStore } from "./app";
import INotification from "./interfaces/INotification";
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

socket.on("likeItem", ({ itemID, userID }: { itemID: string; userID: string }) => {
  userStore.ownItemLikedBySomeone(itemID, userID);
});

socket.on("unlikeItem", ({ itemID, userID }: { itemID: string; userID: string }) => {
  userStore.ownItemUnlikedBySomeone(itemID, userID);
});

socket.on("follow", (userID: string) => {
  userStore.addToArray("followedBy", userID);
});

socket.on("unfollow", (userID: string) => {
  userStore.removeFromArray("followedBy", userID);
});

socket.on("notification", (notification: INotification) => {
  userStore.addNotification(notification);
});

socket.on("messageReaded", (roomName: string) => {
  interlocutorsStore.readMessage(roomName);
});