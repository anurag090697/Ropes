/** @format */

import { Server } from "socket.io";
// import { conversationModel } from "../models/conversationModel.js";
import {
  markMessageRead,
  updateChatData,
} from "../controllers/messageController.js";

let io;
const userSocketMap = {};
// const onlineUsers = new Map();
export const initializeSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.MAIN_PORT || "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    // console.log("User connected:", socket.id);

    let userId;

    // if (userId != "undefined") {
    //   userSocketMap[userId] = socket.id;
    //
    //   io.emit("getOnlineUsers", Object.keys(userSocketMap));
    // }

    socket.on("register_user", (sender) => {
      //   userId = sender;
      //   console.log(sender);
      userSocketMap[sender] = socket.id;
      // console.log(userSocketMap)
    });

    socket.on("join_conversation", async (data) => {
      const newConvo = await markMessageRead(data);
      const recipientSocketId = userSocketMap[data.user];
      if (recipientSocketId) {
        //   console.log(newConvo)
        io.to(recipientSocketId).emit("joined_conversation", newConvo);
      }
    });

    socket.on("send_message", async (data) => {
      //   console.log("Message received:", data);
      const newData = await updateChatData(data);

      //   console.log(newData);
      const recipientSocketId = userSocketMap[data.recipient];
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("receive_message", newData);
      }
    });
    // console.log(userSocketMap);
    socket.on("typing", (data) => {
      //   console.log(userSocketMap[data.recipient]);
      const recipientSocketId = userSocketMap[data.recipient];
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("user_typing", {
          user: data.userId,
          isTyping: data.isTyping,
          conversationId: data.conversationId,
        });
      }
    });

    socket.on("not_typing", (data) => {
      const recipientSocketId = userSocketMap[data.recipient];
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("not_typing", {
          user: data.userId,
          isTyping: data.isTyping,
          conversationId: data.conversationId,
        });
      }
    });

    socket.on("disconnect", () => {
      //   console.log("User disconnected:", socket.id);

      const userId = Object.keys(userSocketMap).find(
        (key) => userSocketMap[key] === socket.id
      );
      if (userId) {
        delete userSocketMap[userId];

        io.emit("getOnlineUsers", Object.keys(userSocketMap));
      }
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

export const getRecipientSocketId = (recipientId) => {
  return userSocketMap[recipientId];
};

export const emitToUser = (userId, event, data) => {
  const socketId = userSocketMap[userId];
  if (socketId) {
    getIO().to(socketId).emit(event, data);
  }
};

export const emitToConversation = (conversationId, event, data) => {
  getIO().to(conversationId).emit(event, data);
};

export const broadcastToAll = (event, data) => {
  getIO().emit(event, data);
};

export { io };

//       {
//   message: data.message.text,
//   sender: data.sender,
//   // timestamp: new Date(),
//       }
//   const recipientSocketId = userSocketMap[data.recipient];
//   if (recipientSocketId) {
//     io.to(recipientSocketId).emit("new_message_notification", {
//       message: data.message,
//       sender: data.sender,
//       conversationId: data.conversationId,
//     });
//   }
//   socket.join(conversationId);
//   console.log(`User ${socket.id} joined conversation ${conversationId}`);
//   console.log(data)
