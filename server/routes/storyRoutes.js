const express = require("express");
const Story = require("../models/Story");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// GET all stories
router.get("/", async (req, res) => {
  try {
    // Stories expire in 24 hours in real app, but for high fidelity clone we will show recent stories
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single story by ID (for existing ViewStory routing check)
router.get("/:id", async (req, res) => {
  try {
    // Check if the id is mongo id or just string
    let story;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      story = await Story.findById(req.params.id);
    } else {
      // Fetch by index or some mock fallback
      const stories = await Story.find().sort({ createdAt: -1 });
      const idx = parseInt(req.params.id) - 1;
      story = stories[idx] || stories[0];
    }
    
    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }
    res.json(story);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST Create story
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { mediaUrl, mediaType, caption } = req.body;
    if (!mediaUrl) {
      return res.status(400).json({ error: "Media URL is required" });
    }

    const story = new Story({
      user: req.user._id,
      username: req.user.username,
      userProfilePic: req.user.profilePic,
      mediaType: mediaType || "image",
      mediaUrl,
      caption: caption || "",
    });

    await story.save();
    res.status(201).json(story);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;