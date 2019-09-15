import mongoose, { Schema, model } from "mongoose";
import { IItem, IItemModel } from "./interfaces";
import User from "./user";

const itemSchema = new Schema({
  itemModel: {
    type: String,
    trim: true,
  },
  brand: {
    type: String,
    trim: true,
  },
  size: {
    type: String,
    trim: true,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  condition: {
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
  images: {
    type: Array,
    required: true
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User"
  },
}, {timestamps: true});

const Item: IItemModel = model<IItem, IItemModel>("Item", itemSchema);

export default Item;
