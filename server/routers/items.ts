import express from "express";
import Item from "../models/item";
import AuthMiddleware from "../middlwares/auth";
import { IAuthRequest, IMatch } from "./interfaces";

const router = express.Router();

router.post("/api/items", AuthMiddleware, async (req: IAuthRequest, res) => {
  const item = new Item({ ...req.body, owner: req.user._id });
//, price: parseInt(req.body.price)
  try {
    await item.save();
    res.status(201).send(item);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/api/items", async (req, res) => {
  const { size, gender, category, name } = req.query;
  const queries: IMatch = { size, gender, category };

  let match: IMatch = name
    ? {
        name: {
          $regex: new RegExp(name.trim().replace(/_/g, "|")),
          $options: "i"
        }
      }
    : {};

  Object.keys(queries).forEach(
    (key: "size" | "gender" | "category" | "name") => {
      if (queries[key]) {
        match = { ...match, [key]: queries[key] };
      }
    }
  );

  try {
    const items = await Item.find(match);
    res.send(items);
  } catch (e) {
    res.status(500).send();
  }
});


router.get("/api/items/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    await item.populate("owner").execPopulate()
    if (!item) {
      throw new Error("Unable to find item!");
    }
    res.send(item);
  } catch (e) {
    res.status(404).send(e);
  }
});

export default router;
