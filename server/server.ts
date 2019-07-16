import express from "express";
import itemsRouter from "./routers/items";
import usersRouter from "./routers/users";
import "./db/mongoose";
import Item from "./models/item";
import User from "./models/user";
const app = express();
const port = process.env.PORT || 3000;

const test = {
  z: 1,
  x: 3
};

app.get("/", (req, res) => {
  res.send(test);
});

//It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

app.use(itemsRouter);
app.use(usersRouter);

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
