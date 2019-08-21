import express from "express";
import http from "http";
import socketio, { Socket } from "socket.io";
import path from "path";
import cookieParser from "cookie-parser";
import itemsRouter from "./routers/items";
import usersRouter from "./routers/users";
import imagesRouter from "./routers/images";
import "./db/mongoose";
import MessangerRoom from "./models/messangerRoom";

const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "..", "public");

// It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(itemsRouter);
app.use(usersRouter);
app.use(imagesRouter);

app.use(express.static(path.join(publicPath, "static")));
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket: Socket) => {
  socket.on("join", async (usersIDs: string[]) => {
    let roomName = "";
    const room = await MessangerRoom.findOne({
      $or: [
        { roomName: `${usersIDs[0]}-${usersIDs[1]}` },
        { roomName: `${usersIDs[1]}-${usersIDs[0]}` }
      ]
    });

    if (!room) {
      const newRoom = new MessangerRoom({
        roomName: `${usersIDs[0]}-${usersIDs[1]}`
      });
      await newRoom.save();
      roomName = newRoom.roomName;
    } else {
      roomName = room.roomName;
    }
    socket.join(roomName);
    socket.emit("roomName", roomName);
  });

  socket.on(
    "sendMessage",
    async ({
      message,
      roomName,
      sender
    }: {
      message: string;
      roomName: string;
      sender: string;
    }) => {
      const room = await MessangerRoom.findOne({ roomName });
      if (room) {
        const messageObject = {
          message,
          sender,
          sendedAt: Date.now().toString()
        };

        room.messages = [...room.messages, messageObject];
        await room.save();
        io.sockets.in(roomName).emit("message", messageObject);
      }
    }
  );
});

server.listen(port, () => {
  console.log(`Server is listing on port ${port}`);
});
