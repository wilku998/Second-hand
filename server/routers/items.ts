import express from "express";
import Item from "../models/item";
import AuthMiddleware from "../middlwares/auth";
import { IAuthRequest } from "./interfaces";
import { parseItem } from "./functions/parseItems";
import { createQueryItems, parseNumber } from "./functions/other";
const router = express.Router();

router.post("/api/items", AuthMiddleware, async (req: IAuthRequest, res) => {
  const item = new Item({
    ...req.body,
    owner: req.user._id,
    price: parseInt(req.body.price)
  });
  try {
    await item.save();
    res.status(201).send(await parseItem(item));
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/api/items/count", async (req, res) => {
  const query = createQueryItems(req.query);
  try {
    const count = await Item.countDocuments(query);
    res.send({ count });
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/api/items", async (req, res) => {
  const { skip, limit, order, sortBy } = req.query;
  const query = createQueryItems(req.query);

  try {
    const items = await Item.find(query)
      .sort({ [sortBy]: parseNumber(order) })
      .skip(parseNumber(skip))
      .limit(parseNumber(limit));

      const parsedItems = await Promise.all(
      items.map(async item => {
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
