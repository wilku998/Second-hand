import mongoose, { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import path from "path";
import { IUser, IUserModel } from "./interfaces";

require("dotenv").config({ path: path.resolve(__dirname, "..", ".env.all") });

/*
notifcations types
- new folow / like done
- followed user add item / like item done / follow user done


create of notifaction in separate function
newly created notfication will be fetched by client and sended by socket
*/

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ],
    avatar: {
      type: String,
      default: "/images/default-avatar.png"
    },
    likedItems: [
      { item: { type: mongoose.Types.ObjectId, ref: "Item", required: true } }
    ],
    follows: [
      { user: { type: mongoose.Types.ObjectId, ref: "User", required: true } }
    ],
    notifications: [
      {
        addedAt: {
          type: Number,
          required: true
        },
        kind: {
          type: String,
          required: true
        },
        user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
        item: { type: mongoose.Types.ObjectId, ref: "Item" },
        userWhoGotFollow: { type: mongoose.Types.ObjectId, ref: "User" },
        isReaded: {
          type: Boolean,
          default: false
        }
      }
    ],
    followedByQuantity: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function(this: IUser, next: () => void) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

////////////////////////////////////////////////////////////////////////////////

userSchema.virtual("ownItems", {
  ref: "Item",
  localField: "_id",
  foreignField: "owner"
});

userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

userSchema.methods.generateAuthToken = async function(this: IUser) {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET_KEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredenctials = async (
  email: string,
  password: string
) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error();
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error();
  }

  return user;
};

const User: IUserModel = model<IUser, IUserModel>("User", userSchema);

// const deleteAll = async () => await User.deleteMany({});
// deleteAll();

// const clearAllUsersNotifications = async () => {
//   const users = await User.find({});
//   users.forEach(user => {
//     user.notifications = []
//     user.save()
//   })
// }
// clearAllUsersNotifications();

export default User;
