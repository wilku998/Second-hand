import mongoose, { Schema, model } from "mongoose";
import { IItem, IItemModel } from "./interfaces";

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
    type: String,
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
  likedBy: [{ user: { type: mongoose.Types.ObjectId, ref: "User" } }]
}, {timestamps: true});

// itemSchema.methods.toJSON = function() {
//   const item = this;
//   const itemObject = item.toObject();
//   itemObject.likedBy = itemObject.likedBy.map((e: any) => e.user);
//   return itemObject;
// };

const Item: IItemModel = model<IItem, IItemModel>("Item", itemSchema);

export default Item;
