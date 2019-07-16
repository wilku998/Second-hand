import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import { IItem, IItemModel } from "./interfaces";

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },
  size: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: Buffer
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User"
  }
});

const validateArray = (value: string, allowed: Array<string>) =>
  allowed.includes(value);

itemSchema.path("gender").validate((value: string) => {
  const allowed = ["men", "women", "unisex"];
  if (!validateArray(value, allowed)) {
    throw new Error("Incorrect value of gender");
  }
});

itemSchema.path("category").validate((value: string) => {
  const allowed = [
    "shoes",
    "pants",
    "shorts",
    "t-shirt",
    "long-sleeve",
    "hoodie",
    "crewneck",
    "others"
  ];
  if (!validateArray(value, allowed)) {
    throw new Error("Incorrect value of category");
  }
});

const Item: IItemModel = model<IItem, IItemModel>("Item", itemSchema);

export default Item;
