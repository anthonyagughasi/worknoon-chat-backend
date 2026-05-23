const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

exports.createConversation = async (req, res) => {
  const { recipientId } = req.body;
  try {
    let conversation = await Conversation.findOne({
      participants: { $all: [req.user._id, recipientId] }
    });
    if (!conversation) {
      conversation = await Conversation.create({ participants: [req.user._id, recipientId] });
    }
    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ message: 'Conversation initialization failure', error: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  const { conversationId, text } = req.body;
  let fileUrl = req.file ? `/uploads/${req.file.filename}` : null;
  try {
    const message = await Message.create({
      conversationId,
      sender: req.user._id,
      text,
      fileUrl,
      readBy: [req.user._id]
    });
    await Conversation.findByIdAndUpdate(conversationId, { lastMessage: message._id });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Data transit engine failure', error: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ conversationId: req.params.conversationId }).populate('sender', 'name role');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Data query parsing failure', error: error.message });
  }
};
