import express from "express";
import sharp from "sharp";
import bcrypt from "bcryptjs";
import User from "../models/user";
import { IAuthRequest, IUserRequest } from "./interfaces";
import AuthMiddleware from "../middlwares/auth";
import FindUserMiddleware from "../middlwares/findUser";
import Item from "../models/item";
import {
  parseUser,
  parseFollowsAndLikes,
  parseUsers,
  getFollowedBy
} from "./functions/parseUser";
import {
  uploadImage,
  createQueryUsers,
  parseNumber,
  onScrollLoadingSlice
} from "./functions/other";
import parseNotifications from "./functions/parseNotifications";

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
      const followedUser = await User.findById(userID);
      if (!followedUser) {
        throw new Error();
      }
      followedUser.followedByQuantity++;
      await followedUser.save();
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
      const followedUser = await User.findById(userID);
      if (!followedUser) {
        throw new Error();
      }
      followedUser.followedByQuantity--;
      await followedUser.save();
      user.follows = user.follows.filter(e => {
        return e.user.toString() !== userID;
      });
      await user.save();
      res.send();
    } catch (e) {
      res.status(404).send(e);
    }
  }
);

router.get("/api/users/count", async (req, res) => {
  const query = createQueryUsers(req.query.name);
  try {
    const count = await User.countDocuments(query);
    res.send({ count });
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/api/users", async (req, res) => {
  const { name, skip, limit, order, sortBy } = req.query;
  const query = createQueryUsers(name);
  try {
    const foundedUsers = await User.find(query)
      .sort({ [sortBy ? sortBy : "_id"]: parseNumber(order) })
      .skip(parseNumber(skip))
      .limit(parseNumber(limit));

    const users = await parseUsers(foundedUsers);
    res.send(users);
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
      follows: await parseUsers(parseFollowsAndLikes(follows, "user")),
      followedBy: await parseUsers(followedBy)
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
        if (notificationID === "all" || e._id.toString() === notificationID) {
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

router.get(
  "/api/user/notifications",
  AuthMiddleware,
  async (req: IAuthRequest, res) => {
    try {
      const { skip, limit } = req.query;
      const notifications = await parseNotifications(
        onScrollLoadingSlice(skip, limit, req.user.notifications)
      );
      res.send({ notifications });
    } catch (e) {
      res.status(500).send();
    }
  }
);

export default router;
