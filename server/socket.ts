import socketio, { Socket } from "socket.io";
import { Types } from "mongoose";
import MessangerRoom from "./models/messangerRoom";
import { IMessangerRoom, IUser, INotification } from "./models/interfaces";
import createInterlocutor from "./functions/createInterlocutor";
import User from "./models/user";
import {
  getMinifedItem,
  getMinifedUser,
  IMinifedUser,
  IMinifedItem
} from "./functions/getMinifed";
import checkIfNotificationsExist from "./functions/checkIfNotificationsExist";
import { server } from "./server";
import { getFollowedBy } from "./routers/functions/parseUser";

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

const createAndEmitNotification = async (
  user: IUser,
  kind: INotification["kind"],
  userForNotification: IMinifedUser,
  propertyForNotification?: IMinifedItem | IMinifedUser,
  propertyName?: "item" | "userWhoGotFollow"
) => {
  const _id = Types.ObjectId();
  const notification: any = {
    _id,
    kind: kind,
    user: userForNotification,
    addedAt: Date.now(),
    isReaded: false
  };
  if (propertyForNotification) {
    notification[propertyName] = propertyForNotification;
  }
  if (
    checkIfNotificationsExist(
      user.notifications,
      notification.kind,
      userForNotification,
      propertyForNotification,
      propertyName
    )
  ) {
    try {
      user.notifications = [...user.notifications, notification];
      await user.save();
      emitToUserTemplate(
        "notification",
        user._id.toString(),
        propertyForNotification
          ? {
              ...notification,
              [propertyName]: propertyForNotification
            }
          : notification
      );
    } catch (e) {
      console.log(e);
    }
  }
};

const emitNotificationForFollowedBy = async (
  kind: INotification["kind"],
  user: IMinifedUser,
  propertyForNotification?: IMinifedItem | IMinifedUser,
  propertyName?: "item" | "userWhoGotFollow"
) => {
  const userToEmitFollowedBy = await getFollowedBy(user._id);

  await Promise.all(
    userToEmitFollowedBy.map(async (e, i) => {
      createAndEmitNotification(
        e,
        kind,
        user,
        propertyForNotification,
        propertyName
      );
    })
  );
};

////////////////////////////////////////////////////////////////////////////////////////////

io.on("connection", (socket: Socket) => {
  clients[socket.id] = { userID: "" };

  socket.on("setUserID", (userID: string) => {
    clients[socket.id].userID = userID;
  });

  socket.on("cleanUserID", () => {
    clients[socket.id] = { userID: "" };
  });

  socket.on("sendNewItem", async (user: IMinifedUser, itemID: string) => {
    const item = await getMinifedItem(itemID);
    await emitNotificationForFollowedBy(
      "followedUserAddedItem",
      user,
      item,
      "item"
    );
  });

  socket.on(
    "sendLikeItem",
    async (itemID, userToEmitID, user: IMinifedUser) => {
      const item = await getMinifedItem(itemID);
      const userToEmit = await User.findById(userToEmitID);
      userToEmit.populate("ownItems").execPopulate();
      console.log(userToEmit.ownItems);

      await createAndEmitNotification(
        await User.findById(userToEmitID),
        "ownItemLikedBySomeone",
        user,
        item,
        "item"
      );
      if (
        userToEmit.ownItems.findIndex(
          (e: any) => e._id.toString() === itemID
        ) === -1
      ) {
        await emitNotificationForFollowedBy(
          "followedUserLiked",
          user,
          item,
          "item"
        );
      }
    }
  );

  socket.on("sendUnlikeItem", (itemID, userToEmit, user) => {
    emitToUserTemplate("unlikeItem", userToEmit, { itemID, user });
  });

  socket.on("sendFollow", async (userToEmitID, userID) => {
    emitToUserTemplate("follow", userToEmitID, userID);
    const user = await getMinifedUser(userID);
    const userWhoGotFollow = await getMinifedUser(userToEmitID);
    await createAndEmitNotification(
      await User.findById(userToEmitID),
      "follow",
      user
    );

    await emitNotificationForFollowedBy(
      "followedUserFollows",
      user,
      userWhoGotFollow,
      "userWhoGotFollow"
    );
  });

  socket.on("sendUnfollow", (userToEmitID, userID) => {
    emitToUserTemplate("unfollow", userToEmitID, userID);
  });

  socket.on(
    "sendNewRoom",
    async (room: IMessangerRoom, userID: string, interlocutorID: string) => {
      const interlocutor = await createInterlocutor(userID, room);
      socket.emit("newInterlocutor", interlocutor);

      emitToUser(interlocutorID, async (socketsToEmit: any) => {
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
      io.sockets.in(roomName).emit("messageReaded", roomName);
    }
  });

  socket.on("disconnect", () => {
    delete clients[socket.id];
  });
});
