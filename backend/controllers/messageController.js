/** @format */

import mongoose from "mongoose";
import { conversationModel } from "../models/conversationModel.js";
import { userModel } from "../models/userModel.js";
// // import { uploadImage } from "../services/uploadToCloudinary.js";
import { getIO, emitToUser, broadcastToAll } from "../services/Socket.js";

export async function getChats(req, res) {
  try {
    const { sender, recipient } = req.query;
    // console.log(sender, recipient);

    const convos = await conversationModel.findOne({
      "participants.userId": { $all: [sender, recipient] },
    });

    // console.log(convos);
    if (recipient && !convos) {
      let newChat = new conversationModel();
      let person1 = await userModel.findById(sender);
      let person2 = await userModel.findById(recipient);

      newChat.participants.push({
        userId: person2._id,
        username: person2.username,
        name: person2.name,
        displaypicture: person2.displaypicture,
      });
      newChat.participants.push({
        userId: person1._id,
        username: person1.username,
        name: person1.name,
        displaypicture: person1.displaypicture,
      });
      await newChat.save();
      //   res.status(201).json(newChat);
    }
    const allConvos = await conversationModel.find({
      participants: {
        $elemMatch: {
          $and: [{ userId: sender }],
        },
      },
    }).sort({ updatedAt: -1 });
    res.status(200).json(allConvos);
    // if (recipient) {
    //   console.log(sender, recipient);
    //   res.send("hehe");

    // }
    // res.send("hahah");
  } catch (error) {
    res.status(500).json({ message: "", error: error });
  }
}

export async function sendMsg(req, res) {
  try {
    const { sender, recipient, message } = req.body;
    const convos = await conversationModel.findOne({
      "participants.userId": { $all: [sender, recipient] },
    });
    if (!convos) {
      res.status(404).json({ message: "", error: "Not found" });
      return;
    }
    convos.messages.push(message);
    await convos.save();
    res.status(201).json(convos);
  } catch (error) {
    res.status(500).json({ message: "", error: error });
  }
}

export async function updateChatData(data) {
  const { sender, recipient, message, chatId } = data;
  // console.log(chatId, message);
  try {
    const convos = await conversationModel.findById(chatId);
    if (convos) {
      // console.log(convos);
      convos.messages.push(message);
      await convos.save();
      return convos;
    }
    return null;
  } catch (error) {
    return null;
    // console.log(error);
  }
}

export async function markMessageRead(data) {
  try {
    const { chatId, user } = data;
    // console.log(chatId, user);
    const conversation = await conversationModel.findById(chatId);

    if (!conversation) {
      // return null;
      // console.log('geeee')
    }

    conversation.messages.forEach((message) => {
      if (message.sender !== user) {
        message.seen = true;
      }
    });
    // console.log("firstttt");
    await conversation.save();
    return conversation;
  } catch (error) {
    return null;
  }
}
