import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import { isEmail } from "validator";
import bcrypt from "bcryptjs";
import path from 'path';
import { IUser, IUserModel } from "./interfaces";

require('dotenv').config({path: path.resolve(__dirname, '..', '.env.all')});

const userSchema = new Schema({
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
    type: Buffer
  }
});

userSchema.path("name").validate((value: string) => {
  const { length } = value;
  if (length < 5 && length > 25) {
    throw new Error("Name should have at least 5 characters and less than 25!");
  }
});

userSchema.path("email").validate((value: string) => {
  if (!isEmail(value)) {
    throw new Error("Email is incorrect!");
  }
});

userSchema.path("password").validate((value: string) => {
  if (value.toLowerCase().includes("password")) {
    throw new Error('Password cannot contain "password"');
  }
});

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
    throw new Error("Unable to login!");
  }

  const isMatch = bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login!");
  }

  return user;
};

const User: IUserModel = model<IUser, IUserModel>("User", userSchema);

export default User;
