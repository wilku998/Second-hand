import express from "express";
import http from "http";
import path from "path";
import cookieParser from "cookie-parser";
import itemsRouter from "./routers/items";
import usersRouter from "./routers/users";
import imagesRouter from "./routers/images";
import messangerRoomsRouter from "./routers/messangerRooms";
import "./db/mongoose";

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

export const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is listing on port ${port}`);
});

import "./socket";
