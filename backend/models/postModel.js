/** @format */

import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ropes_user",
      required: true,
    },
    text: {
      type: String,
    },
    picture: {
      type: String,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ropes_user",
      },
    ],
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ropes_user",
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        displaypicture: {
          type: String,
        },
        username: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export const postModel = mongoose.model("ropes_post", postSchema);
