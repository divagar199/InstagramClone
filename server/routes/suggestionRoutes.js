const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

// GET suggestions
router.get("/", async (req, res) => {
  try {
    let currentUserId = null;
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith("Bearer ")) {
      try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_insta_secret");
        currentUserId = decoded.id;
      } catch (e) {
        // Token invalid, ignore
      }
    }

    let query = {};
    if (currentUserId) {
      const currentUser = await User.findById(currentUserId);
      if (currentUser) {
        // Exclude current user and users already followed
        query = {
          _id: { $ne: currentUser._id, $nin: currentUser.following },
        };
      }
    }

    const suggestedUsers = await User.find(query)
      .select("username fullName profilePic bio followers")
      .limit(5);

    // Map to suggestion response format
    const suggestions = suggestedUsers.map((user) => ({
      _id: user._id,
      id: user._id.toString(),
      username: user.username,
      fullName: user.fullName,
      profilePic: user.profilePic,
      mutualFollowers: Math.floor(Math.random() * 5) + 1, // High fidelity visual element
    }));

    res.json(suggestions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;