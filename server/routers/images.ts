import express from "express";
import sharp from 'sharp';
import authMiddleware from "../middlwares/auth";
import { uploadImage } from "./functions";
import { IAuthRequest } from "./interfaces";
import Image from "../models/image";

const router = express.Router();

router.post(
  "/api/images/getbase64",
  authMiddleware,
  uploadImage.single("itemImage"),
  async (req: any, res:any) => {
    const buffer = await sharp(req.file.buffer)
      .png()
      .resize(250)
      .toBuffer();
    res.send(buffer.toString('base64'));
  },
  (error:any , req:any , res:any , next:any ) => {
    //this is coming from exprees not multer, and it is way to handling error becuse when new Error is throwed it will by send
    // as html document with error as element but we want json
    res.status(400).send({ error: error.message });
  }
);

router.post("/api/images", authMiddleware, async (req: IAuthRequest, res) => {
  try{
    const imagesBuffers = req.body.images.map((e:string) => ({buffer: Buffer.from(e, 'base64')}))
    const images: any = await Image.insertMany(imagesBuffers)
    res.status(201).send(images.map((e: any) => e._id))
  }catch(e){
    res.status(400).send();
  }
})

router.get("/api/images/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      throw new Error();
    }
    res.set("Content-type", "image/jpeg").send(image.buffer);
  } catch (e) {
    res.sendStatus(404);
  }
});

router.delete("/api/images/:id", async (req, res) => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);
    if (!image) {
      throw new Error();
    }
    res.status(204).send();
  } catch (e) {
    console.log(e)
    res.sendStatus(404);
  }
})

export default router;
