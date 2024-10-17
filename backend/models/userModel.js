/** @format */

import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    displaypicture: {
      type: String,
      default: "",
    },
    followers: [{ type: String }],
    following: [{ type: String }],
    bio: {
      type: String,
      default: "",
    },
  },
  { Timestamp: true }
);

export const userModel = mongoose.model("ropes_user", userSchema);
