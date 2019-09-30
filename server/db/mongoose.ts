import mongoose from "mongoose";

// mongoose.connect(
//     process.env.MONGODB_URI,
//   {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false
//   }
// );

mongoose.connect(
  process.env.NODE_ENV === "production"
    ? process.env.MONGODB_URI
    : "mongodb://127.0.0.1:27017/second-hand",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);
