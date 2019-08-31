import express from "express";
import http from "http";
import socketio, { Socket } from "socket.io";
import path from "path";
import cookieParser from "cookie-parser";
import itemsRouter from "./routers/items";
import usersRouter from "./routers/users";
import imagesRouter from "./routers/images";
import messangerRoomsRouter from "./routers/messangerRooms";
import "./db/mongoose";
import MessangerRoom from "./models/messangerRoom";
import { IMessangerRoom } from "./models/interfaces";
import createInterlocutor from "./functions/createInterlocutor";

const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "..", "public");

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(itemsRouter);
app.use(usersRouter);
app.use(imagesRouter);
app.use(messangerRoomsRouter);

app.use(express.static(path.join(publicPath, "static")));

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

const server = http.createServer(app);
const io = socketio(server);

const clients: any = [];

const findClients = (userID: string) =>
  Object.keys(clients).filter(key => userID === clients[key].userID);

const emitToUser = (userID: string, callback: any) => {
  const socketsToEmit = findClients(userID);
  if (socketsToEmit.length > 0) {
    callback(socketsToEmit);
  }
};

const emitToUserTemplate = (name: string, userToEmit: string, data: any) => {
  emitToUser(userToEmit, (socketsToEmit: any) => {
    socketsToEmit.forEach((socketID: string) => {
      io.to(socketID).emit(name, data);
    });
  });
};

io.on("connection", (socket: Socket) => {
  clients[socket.id] = { userID: "" };

  socket.on("setUserID", (userID: string) => {
    clients[socket.id].userID = userID;
  });

  socket.on("cleanUserID", () => {
    clients[socket.id] = { userID: "" };
  });

  socket.on("sendLikeItem", (itemID, userToEmit, user) => {
    console.log(itemID, userToEmit, user);
    emitToUserTemplate("likeItem", userToEmit, { itemID, user });
  });

  socket.on("sendUnlikeItem", (itemID, userToEmit, user) => {
    emitToUserTemplate("unlikeItem", userToEmit, { itemID, user });
  });

  socket.on("sendFollow", (userToEmit, userID) => {
    emitToUserTemplate("follow", userToEmit, userID);
  });

  socket.on("sendUnfollow", (userToEmit, userID) => {
    emitToUserTemplate("unfollow", userToEmit, userID);
  });

  socket.on(
    "sendNewRoom",
    async (room: IMessangerRoom, userID: string, interlocutorID: string) => {
      emitToUser(interlocutorID, async (socketsToEmit: any) => {
        const interlocutor = await createInterlocutor(userID, room);
        socket.emit("newInterlocutor", interlocutor);
        socketsToEmit.map(async (socketId: string) => {
          const interlocutor = await createInterlocutor(interlocutorID, room);
          io.to(socketId).emit("newInterlocutor", interlocutor);
        });
      });
    }
  );

  socket.on("join", roomName => {
    socket.join(roomName);
  });

  socket.on("leave", roomName => {
    socket.leave(roomName);
  });

  socket.on(
    "sendMessage",
    async ({
      message,
      roomName,
      senderID
    }: {
      message: string;
      roomName: string;
      senderID: string;
    }) => {
      console.log("send message");
      const room = await MessangerRoom.findOne({ roomName });
      if (room) {
        const messageObject = {
          message,
          senderID,
          sendedAt: Date.now().toString()
        };

        room.messages = [...room.messages, messageObject];
        room.isReaded = false;
        await room.save();
        io.sockets.in(roomName).emit("message", messageObject, room.roomName);
      }
    }
  );

  socket.on("sendMessageReaded", async (roomName: string) => {
    const room = await MessangerRoom.findOne({ roomName });
    if (room) {
      room.isReaded = true;
      room.save();
      io.sockets.in(roomName).emit("messageReaded");
      console.log("send message readed");
    }
  });

  socket.on("disconnect", () => {
    delete clients[socket.id];
  });
});

server.listen(port, () => {
  console.log(`Server is listing on port ${port}`);
});
