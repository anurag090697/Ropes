/** @format */

import mongoose from "mongoose";

const conversationSchema = mongoose.Schema(
  {
    participants: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
        displaypicture: { type: String },
        username: { type: String },
        name: { type: String },
      },
    ],
    messages: [
      {
        text: { type: String },
        sender: { type: String, required: true },
        seen: { type: Boolean, default: false },
        image: { type: String, default: "" },
      },
    ],
  },
  { timestamps: true }
);

export const conversationModel = mongoose.model(
  "ropes_coversation",
  conversationSchema
);
