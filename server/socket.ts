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
import checkIfNotificationDoesntExist from "./functions/checkIfNotificationDoesntExist";
import { server } from "./server";
import { getFollowedBy } from "./routers/functions/parseUser";
import Item from "./models/item";
import parseNotifications from "./routers/functions/parseNotifications";

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

const emitToUserTemplate = (name: string, userToEmitID: string, data: any) => {
  emitToUser(userToEmitID, (socketsToEmit: any) => {
    socketsToEmit.forEach((socketID: string) => {
      io.to(socketID).emit(name, data);
    });
  });
};

const createAndEmitNotification = async (
  userToEmitID: string,
  kind: INotification["kind"],
  userID: string,
  secondPropertyForNotificationID?: string,
  secondPropertyName?: "item" | "userWhoGotFollow"
) => {
  const UserToEmit = await User.findById(userToEmitID);
  if (
    checkIfNotificationDoesntExist(
      UserToEmit.notifications,
      kind,
      userID,
      secondPropertyForNotificationID,
      secondPropertyName
    )
  ) {
    const _id = Types.ObjectId();
    const notification: INotification = {
      _id,
      kind,
      user: userID,
      addedAt: Date.now(),
      isReaded: false
    };

    if (secondPropertyForNotificationID) {
      notification[secondPropertyName] = secondPropertyForNotificationID;
    }

    try {
      UserToEmit.notifications = [...UserToEmit.notifications, notification];
      await UserToEmit.save();
      const parsedNotification = await parseNotifications([notification]);
      emitToUserTemplate("notification", userToEmitID, parsedNotification[0]);
    } catch (e) {
      console.log(e);
    }
  }
};

const emitNotificationForFollowedBy = async (
  userID: string,
  kind: INotification["kind"],
  propertyForNotificationID: string,
  propertyName: "item" | "userWhoGotFollow",
  itemOwnerID?: string
) => {
  const userToEmitFollowedBy = await getFollowedBy(userID);

  await Promise.all(
    userToEmitFollowedBy.map(async (e, i) => {
      const userToEmitID = e._id.toString();
      const emit = () =>
        createAndEmitNotification(
          userToEmitID,
          kind,
          userID,
          propertyForNotificationID,
          propertyName
        );
      switch (kind) {
        case "followedUserFollows":
          if (userToEmitID !== propertyForNotificationID) {
            emit();
          }
          break;
        case "followedUserLiked":
          if (userToEmitID !== itemOwnerID) {
            emit();
          }
          break;
        default:
          emit();
          break;
      }
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

  socket.on("sendNewItem", async (itemID: string) => {
    const item = await Item.findById(itemID);
    await emitNotificationForFollowedBy(
      item.owner.toString(),
      "followedUserAddedItem",
      itemID,
      "item"
    );
  });

  socket.on("sendLikeItem", async (itemID: string, userWhoLikedID: string) => {
    const item = await Item.findById(itemID);
    const ownerID = item.owner.toString();

    emitToUserTemplate("likeItem", ownerID, { itemID, userID: userWhoLikedID });

    await createAndEmitNotification(
      ownerID,
      "ownItemLikedBySomeone",
      userWhoLikedID,
      itemID,
      "item"
    );

    await emitNotificationForFollowedBy(
      userWhoLikedID,
      "followedUserLiked",
      itemID,
      "item",
      ownerID
    );
  });

  socket.on(
    "sendUnlikeItem",
    async (itemID: string, userWhoLikedID: string) => {
      const item = await Item.findById(itemID);
      emitToUserTemplate("unlikeItem", item.owner.toString(), {
        itemID,
        userID: userWhoLikedID
      });
    }
  );

  socket.on("sendFollow", async (userWhoGotFollowID, userID) => {
    emitToUserTemplate("follow", userWhoGotFollowID, userID);

    await createAndEmitNotification(userWhoGotFollowID, "follow", userID);

    await emitNotificationForFollowedBy(
      userID,
      "followedUserFollows",
      userWhoGotFollowID,
      "userWhoGotFollow"
    );
  });

  socket.on("sendUnfollow", (userWhoGotFollowID, userID) => {
    emitToUserTemplate("unfollow", userWhoGotFollowID, userID);
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
          sendedAt: Date.now()
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
