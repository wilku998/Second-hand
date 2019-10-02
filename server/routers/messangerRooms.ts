import express from "express";
import { IAuthRequest } from "./interfaces";
import authMiddleware from "../middlwares/auth";
import MessangerRoom from "../models/messangerRoom";
import createInterlocutor from "../functions/createInterlocutor";
import User from "../models/user";
import { createRegexObj } from "./functions/other";

const router = express.Router();

router.get(
  "/api/messangerRooms/interlocutors",
  authMiddleware,
  async (req: IAuthRequest, res) => {
    try {
      const userIDString = req.user._id.toString();
      const messangerRooms = await MessangerRoom.find({
        roomName: createRegexObj(userIDString)
      });

      const interlocutors = await Promise.all(
        messangerRooms.map(async room => {
          const interlocutor = await createInterlocutor(userIDString, room);
          return interlocutor;
        })
      );

      res.send(interlocutors.filter(e => e.interlocutor).reverse());
    } catch (e) {
      console.log(e);
      res.status(500).send();
    }
  }
);

router.post(
  "/api/messangerRooms",
  authMiddleware,
  async (req: IAuthRequest, res) => {
    const { interlocutorID } = req.body;
    const userIDString = req.user._id.toString();
    try {
      const interlocutor = await User.findById(interlocutorID);
      if (!interlocutor) {
        throw new Error();
      }
      const room = new MessangerRoom({
        roomName: `${userIDString}-${interlocutorID}`
      });
      await room.save();

      res.status(201).send(room);
    } catch (e) {
      res.status(404).send();
    }
  }
);

router.get(
  "/api/messangerRooms/messages/:roomName",
  authMiddleware,
  async (req: IAuthRequest, res) => {
    try {
      let { limit, skip } = req.query;
      limit = parseInt(limit);
      skip = parseInt(skip);
      const room = await MessangerRoom.findOne({
        roomName: req.params.roomName
      }).select("messages");
      const messages = room.messages
        .reverse()
        .filter((e, i) => i + 1 > skip && i + 1 <= limit + skip).reverse();

      res.send({ messages });
    } catch (e) {
      res.status(404).send();
    }
  }
);

export default router;
