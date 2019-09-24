import express from "express";
import { IAuthRequest } from "./interfaces";
import authMiddleware from "../middlwares/auth";
import MessangerRoom from "../models/messangerRoom";
import { createRegexObj } from "./functions";
import createInterlocutor from "../functions/createInterlocutor";
import User from "../models/user";

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
          const lastMessage = await createInterlocutor(userIDString, room);
          return lastMessage;
        })
      );

      res.send(interlocutors.filter(e => e.interlocutor));
    } catch (e) {
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
      if(!interlocutor){
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
  "/api/messangerRooms/:roomName",
  authMiddleware,
  async (req: IAuthRequest, res) => {
    try {
      const room = await MessangerRoom.findOne({
        roomName: req.params.roomName
      });
      res.send(room);
    } catch (e) {
      res.status(404).send();
    }
  }
);

export default router;
