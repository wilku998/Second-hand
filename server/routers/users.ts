import express from "express";
import sharp from "sharp";
import User from "../models/user";
import { IAuthRequest, IUserRequest } from "./interfaces";
import AuthMiddleware from "../middlwares/auth";
import FindUserMiddleware from "../middlwares/findUser";
import { uploadImage } from "./functions";

const router = express.Router();

router.post("/api/users", async (req, res) => {
  try {
    const user = new User(req.body);
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
    const user:any = await User.findByCredenctials(email, password);
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
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error: any, req: any, res: any, next: any) => {
    res.status(400).send({ error: error.message });
  }
);

router.get(
  "/users/:id/avatar",
  FindUserMiddleware,
  (req: IUserRequest, res) => {
    try {
      const { user } = req;
      if (!user.avatar) {
        throw new Error();
      }
      res.set("Content-type", "image/png").send(user.avatar);
    } catch (e) {
      res.status(404).send();
    }
  }
);

router.get("/api/users/me", AuthMiddleware, async (req: IAuthRequest, res) => {
  try {
    const { user } = req;
    await user.populate("ownItems").execPopulate();
    res.send({ user, ownItems: user.ownItems });
  } catch (e) {
    res.status(500).send();
  }
});

router.get(
  "/api/users/:id",
  FindUserMiddleware,
  async (req: IUserRequest, res) => {
    try {
      const { user } = req;
      await user.populate("ownItems").execPopulate();
      res.send({ user, ownItems: user.ownItems });
    } catch (e) {
      res.status(500).send();
    }
  }
);

router.delete(
  "/api/users/me",
  AuthMiddleware,
  async (req: IAuthRequest, res) => {
    await User.findOneAndDelete({ _id: req.user._id });
    res.send();
  }
);

export default router;
