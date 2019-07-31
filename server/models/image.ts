import { Schema, model } from "mongoose";
import { IImageModel, IImage } from "./interfaces";

const schema = new Schema({
  buffer: {
    type: Buffer,
    required: true
  }
});

const Image: IImageModel = model<IImage, IImageModel>("Image", schema);

export default Image;
