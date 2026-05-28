const express = require("express");
const Message = require("../models/Message");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// GET conversation history
router.get("/:username", authMiddleware, async (req, res) => {
  try {
    const otherUser = await User.findOne({ username: req.params.username.toLowerCase() });
    if (!otherUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: otherUser._id },
        { sender: otherUser._id, receiver: req.user._id },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST send message
router.post("/send", authMiddleware, async (req, res) => {
  try {
    const { receiverId, text } = req.body;
    if (!receiverId || !text) {
      return res.status(400).json({ error: "Receiver ID and text are required" });
    }

    const message = new Message({
      sender: req.user._id,
      receiver: receiverId,
      text,
    });

    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
