const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const getUserDetailsFromToken = require("../helper/getUserDetailsFromToken");
const UserModel = require("../model/UserModel");
const {
  ConversationModel,
  MessageModel,
} = require("../model/ConversationModel");
const getConversation = require("../helper/getConversation");
// const getConversation = require;("/backend/helper/getConversation");
const app = express();

/***socket connection */
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

//online user
const onlineUser = new Set();
io.on("connection", async (socket) => {
  const token = socket.handshake.auth.token;
  const user = await getUserDetailsFromToken(token);
  // Create a room
  socket.join(user?._id?.toString());
  onlineUser.add(user?._id?.toString());
  io.emit("onlineUser", Array.from(onlineUser));

  socket.on("message-page", async (userId) => {
    const userDetail = await UserModel.findById(userId).select("-password");
    const payload = {
      _id: userDetail?.id,
      name: userDetail?.name,
      email: userDetail?.email,
      profile_pic: userDetail?.profile_pic,
      online: onlineUser.has(userId),
    };
    socket.emit("message-user", payload);
  });

  // new message
  socket.on("new message", async (data) => {
    console.log("data", data);
    try {
      // Check if conversation exists
      let conversation = await ConversationModel.findOne({
        $or: [
          { sender: data?.sender, reciever: data?.reciever },
          { sender: data?.reciever, reciever: data?.sender },
        ],
      });
      // If conversation doesn't exist, create a new one
      if (!conversation) {
        const createConversation = new ConversationModel({
          sender: data?.sender,
          reciever: data?.reciever,
        });
        conversation = await createConversation.save();
      }

      // Create new message
      const message = new MessageModel({
        text: data?.text,
        imageUrl: data?.imageUrl,
        videoUrl: data?.videoUrl,
        msgByUserId: data?.msgByUserId,
      });

      const savedMessage = await message.save();
      console.log("Saved Message: ", savedMessage);
      // Push message to conversation
      await ConversationModel.updateOne(
        { _id: conversation._id },
        { $push: { messages: savedMessage._id } }
      );
      // Retrieve updated conversation
      const getConversationMessage = await ConversationModel.findOne({
        $or: [
          { sender: data?.sender, reciever: data?.reciever },
          { sender: data?.reciever, reciever: data?.sender },
        ],
      })
        .populate("messages")
        .sort({ updatedAt: -1 });
      // Emit message to both sender and receiver
      io.to(data?.sender).emit(
        "message",
        getConversationMessage?.messages || []
      );
      io.to(data?.reciever).emit(
        "message",
        getConversationMessage?.messages || []
      );
    } catch (error) {
      console.error("Error in new message handler: ", error);
    }
  });

  // previous-conversation
  socket.on("previous-conversation", async (data) => {
    console.log("data", data);
    try {
      if (data?.sender && data?.reciever) {
        const getConversationMessage = await ConversationModel.findOne({
          $or: [
            { sender: data?.sender, reciever: data?.reciever },
            { sender: data?.reciever, reciever: data?.sender },
          ],
        })
          .populate("messages")
          .sort({ updatedAt: -1 });

        socket.emit("message", getConversationMessage?.messages || []);
      }
      // Retrieve updated conversation
    } catch (error) {
      console.error("Error in new message handler: ", error);
    }
  });

  // Sidebar
  socket.on("sidebar", async (currentUserId) => {
    const conversation = await getConversation(currentUserId);
    socket.emit("conversation", conversation);
  });

  //disconnect
  socket.on("disconnect", () => {
    onlineUser.delete(user?._id);
    console.log("disconnect user ", socket?.id);
  });
});

module.exports = {
  app,
  server,
};
