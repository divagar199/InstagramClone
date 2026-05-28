const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");
const Notification = require("../models/Notification");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// GET all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username profilePic fullName")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST Create post
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { imageUrl, caption, location } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ error: "Image URL is required" });
    }

    const post = new Post({
      user: req.user._id,
      username: req.user.username,
      userProfilePic: req.user.profilePic,
      imageUrl,
      caption,
      location,
    });

    await post.save();
    
    // Increment post count in profile for user
    // We can also fetch active posts count dynamically
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST Like / Unlike post
router.post("/:id/like", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.id || req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const index = post.likes.findIndex(id => id.toString() === req.user._id.toString());
    let liked = false;
    if (index === -1) {
      // Like
      post.likes.push(req.user._id);
      liked = true;

      // Create notification (if the post is not by the same user)
      if (post.user.toString() !== req.user._id.toString()) {
        const notification = new Notification({
          recipient: post.user,
          sender: req.user._id,
          senderUsername: req.user.username,
          senderProfilePic: req.user.profilePic,
          type: "like",
          post: post._id,
          text: "liked your post.",
        });
        await notification.save();
      }
    } else {
      // Unlike
      post.likes.splice(index, 1);
    }

    await post.save();
    res.json({ likesCount: post.likes.length, liked });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST Add comment
router.post("/:id/comment", authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Comment text is required" });
    }

    const post = await Post.findById(req.id || req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const newComment = {
      user: req.user._id,
      username: req.user.username,
      userProfilePic: req.user.profilePic,
      text,
      timestamp: new Date(),
    };

    post.comments.push(newComment);
    await post.save();

    // Create notification
    if (post.user.toString() !== req.user._id.toString()) {
      const notification = new Notification({
        recipient: post.user,
        sender: req.user._id,
        senderUsername: req.user.username,
        senderProfilePic: req.user.profilePic,
        type: "comment",
        post: post._id,
        text: `commented: "${text.substring(0, 30)}${text.length > 30 ? "..." : ""}"`,
      });
      await notification.save();
    }

    res.status(201).json(post.comments[post.comments.length - 1]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE Post
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.id || req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await Post.findByIdAndDelete(post._id);
    res.json({ success: true, message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
