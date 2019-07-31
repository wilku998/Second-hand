import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import itemsRouter from "./routers/items";
import usersRouter from "./routers/users";
import imagesRouter from "./routers/images";
import "./db/mongoose";

const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "..", "public");


// It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(itemsRouter);
app.use(usersRouter);
app.use(imagesRouter);

app.use(express.static(path.join(publicPath, "static")));
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Server is listing on port ${port}`);
});

const foo = async () => {
  // const item: any = await Item.findById('5d2b709842ef6e2b48cb5585');
  // await item.populate("owner").execPopulate();
  // console.log(item)
  // const user = item.owner;
  // const user: any = await User.findById('5d2afd41b60b3a179c1119ec')
  // await user.populate("ownItems").execPopulate();;
  // console.log(user.ownItems)
};
// foo();
