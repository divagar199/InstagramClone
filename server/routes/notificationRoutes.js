const express = require("express");
const Notification = require("../models/Notification");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// GET user notifications
router.get("/", authMiddleware, async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id })
      .sort({ createdAt: -1 })
      .limit(30);

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT mark notifications as read
router.put("/read", authMiddleware, async (req, res) => {
  try {
    await Notification.updateMany({ recipient: req.user._id, isRead: false }, { isRead: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
