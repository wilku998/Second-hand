const toRegexRange = require("to-regex-range");
import express from "express";
import Item from "../models/item";
import AuthMiddleware from "../middlwares/auth";
import { IAuthRequest, IMatch } from "./interfaces";
import { createRegexObj, parseItem } from "./functions";
const router = express.Router();

router.post("/api/items", AuthMiddleware, async (req: IAuthRequest, res) => {
  const item = new Item({ ...req.body, owner: req.user._id });
  try {
    await item.save();
    res.status(201).send(await parseItem(item));
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
    const parsedItems = await Promise.all(
      items.map(async item => {
        await item.populate("owner").execPopulate();
        return await parseItem(item);
      })
    );
    res.send(parsedItems);
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
    res.send(await parseItem(item));
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
      res.send(await parseItem(updatedItem));
    } catch (e) {
      res.status(404).send();
    }
  }
);

router.delete(
  "/api/items/:id",
  AuthMiddleware,
  async (req: IAuthRequest, res) => {
    try {
      const { id } = req.params;
      await Item.findByIdAndRemove(id);
      res.send();
    } catch (e) {
      res.status(400).send();
    }
  }
);
export default router;
