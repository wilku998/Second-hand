import User from "../models/user";

export default async (req: any, res: any, next: any) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (e) {
    res.status(404).send({ error: "User not found!" });
  }
};
