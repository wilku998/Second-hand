import jwt from "jsonwebtoken";
import path from 'path';
import User from "../models/user";

require('dotenv').config({path: path.resolve(__dirname, '..', '.env.all')});

export default async (req: any, res: any, next: any) => {
  try {
    const token = req.cookies.jwtToken //| req.header("Authorization").replace("Bearer ", "");
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token
    });

    if (!user) {
      throw new Error();
    }
    
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};
