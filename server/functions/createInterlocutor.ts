import { IMessangerRoom } from "../models/interfaces";
import User from "../models/user";

export default async (userIDString: string, room: IMessangerRoom) => {
  const { isReaded, roomName, messages } = room;
  const interlocutorID = roomName.replace("-", "").replace(userIDString, "");
  const interlocutor = await User.findById(interlocutorID);

  return {
    isReaded,
    roomName,
    interlocutor: interlocutor
      ? {
          name: interlocutor.name,
          avatar: interlocutor.avatar,
          _id: interlocutor._id
        }
      : undefined,
    lastMessage: messages[messages.length - 1]
  };
};
