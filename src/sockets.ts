import { socket } from "./socket";
import { userStore } from "./app";

export const sendNewItemSocket = (_id: string) =>
  socket.emit("sendNewItem", _id);

export const likeItemSocket = (likedID: string) =>
  socket.emit("sendLikeItem", likedID, userStore.getID);

export const unlikeItemSocket = (likedID: string) =>
  socket.emit("sendUnlikeItem", likedID, userStore.getID);

export const followSocket = (userID: string) =>
  socket.emit("sendFollow", userID, userStore.getID);

export const unfollowSocket = (userID: string) =>
  socket.emit("sendUnfollow", userID, userStore.getID);

export const setUserIDSocket = (_id: string) => socket.emit("setUserID", _id);

export const cleanUserIDSocket = () => socket.emit("cleanUserID");

export const joinRoomSocket = (roomName: string) =>
  socket.emit("join", roomName);

export const leaveRoomSocket = (roomName: string) =>
  socket.emit("leave", roomName);

export const sendMessageReadedSocket = (roomName: string) =>
  socket.emit("sendMessageReaded", roomName);

export const sendNewRoomSocket = (room, interlocutorID: string) =>
  socket.emit("sendNewRoom", room, userStore.getID, interlocutorID);

export const sendNewMessageSocket = (
  message: string,
  roomName: string,
  senderID: string
) => socket.emit("sendMessage", { message, roomName, senderID });
