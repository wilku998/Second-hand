const toRegexRange = require("to-regex-range");
import express from "express";
import Item from "../models/item";
import AuthMiddleware from "../middlwares/auth";
import { IAuthRequest, IMatch } from "./interfaces";
import { createRegexObj } from "./functions";
const router = express.Router();

router.post("/api/items", AuthMiddleware, async (req: IAuthRequest, res) => {
  const item = new Item({ ...req.body, owner: req.user._id });
  try {
    await item.save();
    res.status(201).send(item);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/api/items", async (req, res) => {
  const { priceFrom, priceTo, name, owner } = req.query;
  let match: IMatch = {
    price: new RegExp(
      toRegexRange(priceFrom ? priceFrom : 0, priceTo ? priceTo : 9999)
    )
  };

  Object.keys(req.query).forEach(
    (
      key:
        | "size"
        | "gender"
        | "category"
        | "name"
        | "owner"
        | "priceFrom"
        | "priceTo"
        | "condition"
    ) => {
      if (key !== "priceFrom" && key !== "priceTo") {
        if (key === "name") {
          match = {
            ...match,
            $or: [
              { itemModel: createRegexObj(name) },
              { brand: createRegexObj(name) }
            ]
          };
        } else if (key === "owner") {
          match.owner = owner;
        } else {
          match[key] = createRegexObj(req.query[key]);
        }
      }
    }
  );
  try {
    const items = await Item.find(match);
    res.send(items);
  } catch (e) {
    res.status(404).send();
  }
});

router.get("/api/items/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    await item.populate("owner").execPopulate();
    if (!item) {
      throw new Error("Unable to find item!");
    }
    res.send(item);
  } catch (e) {
    res.status(404).send();
  }
});

router.patch(
  "/api/items/:id",
  AuthMiddleware,
  async (req: IAuthRequest, res) => {
    try {
      const updatedItem = await Item.findByIdAndUpdate(
        req.params.id,
        req.body.update
      );
      res.send(updatedItem);
    } catch (e) {
      res.status(404).send();
    }
  }
);

export default router;
