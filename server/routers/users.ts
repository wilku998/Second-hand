import express from "express";
import sharp from "sharp";
import User from "../models/user";
import { IAuthRequest, IUserRequest } from "./interfaces";
import AuthMiddleware from "../middlwares/auth";
import FindUserMiddleware from "../middlwares/findUser";
import { uploadImage, createRegexObj } from "./functions";
import Item from "../models/item";
import mongoose from "mongoose";

const router = express.Router();

router.post("/api/users", async (req, res) => {
  try {
    const user = new User({ ...req.body });
    await user.save();
    const token = await user.generateAuthToken();
    res.cookie("jwtToken", token, { maxAge: 108000000, httpOnly: true });
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/api/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user: any = await User.findByCredenctials(email, password);
    const token = await user.generateAuthToken();
    res.cookie("jwtToken", token, { maxAge: 108000000, httpOnly: true });
    await user.populate("ownItems").execPopulate();
    res.send({ user, ownItems: user.ownItems });
  } catch (e) {
    res.status(400).send();
  }
});

router.post(
  "/api/users/logout",
  AuthMiddleware,
  async (req: IAuthRequest, res) => {
    try {
      const { user, token } = req;
      user.tokens = user.tokens.filter(
        (t: { token: string }) => t.token !== token
      );
      await user.save();
      res.send();
    } catch (e) {
      res.status(500).send();
    }
  }
);

router.post(
  "/users/me/avatar",
  AuthMiddleware,
  uploadImage.single("avatar"),
  async (req: IAuthRequest, res: any) => {
    const buffer = await sharp(req.file.buffer)
      .png()
      .resize(250)
      .toBuffer();
    // req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error: any, req: any, res: any, next: any) => {
    res.status(400).send({ error: error.message });
  }
);

router.get("/api/users/me", AuthMiddleware, async (req: IAuthRequest, res) => {
  try {
    const { user } = req;
    await user.populate("ownItems").execPopulate();
    await user.populate("likedItems.item").execPopulate();
    res.send({ user, ownItems: user.ownItems });
  } catch (e) {
    res.status(500).send();
  }
});

interface IUpdateRequest extends IAuthRequest {
  update: any;
}

router.patch(
  "/api/users/me",
  AuthMiddleware,
  async (req: IUpdateRequest, res) => {
    try {
      let { user }: any = req;
      Object.keys(req.body).forEach((key: string) => {
        user[key] = req.body[key];
      });
      await user.save();
      await user.populate("likedItems.item").execPopulate();
      res.send(user);
    } catch (e) {
      res.status(400).send(e);
    }
  }
);
router.patch(
  "/api/users/me/likes",
  AuthMiddleware,
  async (req: IAuthRequest, res) => {
    try {
      let { user } = req;
      const { likedID } = req.body;
      user.likedItems.push({ item: likedID });
      await user.save();
      const item = await Item.findById(likedID);
      item.likedBy = [...item.likedBy, { user: user._id }];
      await item.save();
      await user.populate("likedItems.item").execPopulate();
      res.send(user.likedItems);
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

router.delete(
  "/api/users/me/likes",
  AuthMiddleware,
  async (req: IAuthRequest, res) => {
    try {
      let { user } = req;
      const { likedID } = req.body;
      user.likedItems = user.likedItems.filter(e => {
        return e.item.toString() !== likedID;
      });
      await user.save();
      const item = await Item.findById(likedID);
      item.likedBy = item.likedBy.filter(e => e.user.toString() !== user._id.toString());
      await item.save();
      await user.populate("likedItems.item").execPopulate();
      res.send(user.likedItems);
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

router.patch(
  "/api/users/me/follows",
  AuthMiddleware,
  async (req: IAuthRequest, res) => {
    try {
      let { user } = req;
      const { userID } = req.body;
      user.follows.push({ user: userID });
      await user.save();
      const followedUser = await User.findById(userID);
      followedUser.followedBy = [...followedUser.followedBy, { user: user._id }];
      await followedUser.save();
      await user.populate("follows.user").execPopulate();
      res.send(user.follows);
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

router.delete(
  "/api/users/me/follows",
  AuthMiddleware,
  async (req: IAuthRequest, res) => {
    try {
      let { user } = req;
      const { userID } = req.body;
      user.follows = user.follows.filter(e => {
        return e.user.toString() !== userID;
      });
      await user.save();
      const unfollowedUser = await User.findById(userID);
      unfollowedUser.followedBy = unfollowedUser.followedBy.filter(e => e.user.toString() !== user._id.toString());
      await unfollowedUser.save();
      await user.populate("follows.user").execPopulate();
      res.send(user.follows);
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

router.get("/api/users", async (req, res) => {
  const { name } = req.query;
  let match: { name?: { $regex: RegExp; $options: string } } = name
    ? {
        name: createRegexObj(name)
      }
    : {};
  try {
    const foundedUsers = await User.find(match);
    Promise.all(
      foundedUsers.map(async user => {
        return await user.populate("ownItems").execPopulate();
      })
    ).then(result => {
      const users = result.map(user => ({ user, ownItems: user.ownItems }));
      res.send(users);
    });
  } catch (e) {
    res.status(404).send();
  }
});

router.get(
  "/api/users/:id",
  FindUserMiddleware,
  async (req: IUserRequest, res) => {
    try {
      const { user } = req;
      await user.populate("ownItems").execPopulate();
      await user.populate("likedItems.item").execPopulate();
      res.send({ user, ownItems: user.ownItems });
    } catch (e) {
      res.status(400).send();
    }
  }
);

router.delete(
  "/api/users/me",
  AuthMiddleware,
  async (req: IAuthRequest, res) => {
    try {
      await User.findOneAndDelete({ _id: req.user._id });
      res.send();
    } catch (e) {
      res.status(400).send();
    }
  }
);

export default router;
