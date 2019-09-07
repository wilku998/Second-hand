import express from "express";
import sharp from "sharp";
import bcrypt from "bcryptjs";
import User from "../models/user";
import { IAuthRequest, IUserRequest } from "./interfaces";
import AuthMiddleware from "../middlwares/auth";
import FindUserMiddleware from "../middlwares/findUser";
import {
  uploadImage,
  createRegexObj,
  parseUser,
  parseFollowsAndLikes,
  getFollowedBy
} from "./functions";
import Item from "../models/item";

const router = express.Router();

router.post("/api/users", async (req, res) => {
  try {
    const user = new User({ ...req.body });
    await user.save();
    const token = await user.generateAuthToken();
    res.cookie("jwtToken", token, { maxAge: 108000000, httpOnly: true });
    const parsedUser = await parseUser(user);
    res.status(201).send(parsedUser);
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
    const parsedUser = await parseUser(user);
    res.send(parsedUser);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/api/users/me", AuthMiddleware, async (req: IAuthRequest, res) => {
  try {
    const { user } = req;
    const parsedUser = await parseUser(user);
    res.send(parsedUser);
  } catch (e) {
    res.status(500).send();
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
      res.send();
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
      res.send();
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
      res.send();
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
      res.send();
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
      res.send();
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
    ).then(async result => {
      const users = await Promise.all(
        result.map(async user => await parseUser(user, true))
      );
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
      const parsedUser = await parseUser(user, true);
      res.send(parsedUser);
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
      const { password } = req.body;
      const { user } = req;
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error();
      }
      await Item.deleteMany({ owner: user._id });
      await User.findOneAndDelete({ _id: req.user._id });
      res.send();
    } catch (e) {
      res.status(400).send({ message: "Podane hasło jest nieprawidłowe." });
    }
  }
);

router.get("/api/users/followsAndLikes/:id", async (req, res) => {
  try {
    const user: any = await User.findById(req.params.id);
    if (!user) {
      throw new Error();
    }
    await user.populate("follows.user").execPopulate();
    await user.populate("likedItems.item").execPopulate();
    const { follows, likedItems } = user;
    const followedBy = await getFollowedBy(user._id);

    res.send({
      likedItems: parseFollowsAndLikes(likedItems, "item"),
      follows: parseFollowsAndLikes(follows, "user"),
      followedBy
    });
  } catch (e) {
    res.status(404).send();
  }
});

router.patch(
  "/api/users/me/readNotification",
  AuthMiddleware,
  async (req: IAuthRequest, res) => {
    try {
      const notificationID = req.body.id;
      const { user } = req;
      user.notifications.forEach(e => {
        if (e._id.toString() === notificationID) {
          e.isReaded = true;
        }
      });
      await user.save();
      res.send();
    } catch (e) {
      res.status(500).send();
    }
  }
);

export default router;
