const { ConversationModel } = require("../model/ConversationModel");

const getConversation = async (currentUserId) => {
  if (currentUserId) {
    const currentUserConversation = await ConversationModel.find({
      $or: [{ sender: currentUserId }, { reciever: currentUserId }],
    })
      .sort({ updatedAt: -1 })
      .populate("messages")
      .populate("sender")
      .populate("reciever");

    const conversation = currentUserConversation.map((conv) => {
      const countUnseenMsg = conv.messages.reduce(
        (prev, curr) => prev + (curr.seen ? 0 : 1),
        0
      );

      return {
        _id: conv._id,
        sender: conv.sender,
        reciever: conv.reciever,
        unSeenMsg: countUnseenMsg,
        lastSeen:
          conv.messages.length > 0
            ? conv.messages[conv.messages.length - 1]
            : null,
      };
    });

    console.log("Processed Conversations:", conversation); // Debugging output
    return conversation;
  } else {
    return [];
  }
};

module.exports = getConversation;
