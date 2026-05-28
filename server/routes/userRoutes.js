const express = require("express");
const User = require("../models/User");
const Post = require("../models/Post");
const Notification = require("../models/Notification");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Search users
router.get("/search", async (req, res) => {
  try {
    const query = req.query.q || "";
    if (!query) {
      return res.json([]);
    }

    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { fullName: { $regex: query, $options: "i" } },
      ],
    })
      .select("username fullName profilePic bio")
      .limit(10);

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET profile by username
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username.toLowerCase() })
      .select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Get posts by this user
    const posts = await Post.find({ user: user._id }).sort({ createdAt: -1 });

    res.json({
      _id: user._id,
      username: user.username,
      fullName: user.fullName,
      profilePic: user.profilePic,
      bio: user.bio,
      website: user.website,
      followers: user.followers,
      following: user.following,
      followersCount: user.followers.length,
      followingCount: user.following.length,
      postsCount: posts.length,
      posts,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update profile
router.put("/profile/update", authMiddleware, async (req, res) => {
  try {
    const { fullName, bio, website, profilePic } = req.body;
    const user = await User.findById(req.user._id);

    if (fullName) user.fullName = fullName;
    if (bio !== undefined) user.bio = bio;
    if (website !== undefined) user.website = website;
    if (profilePic) user.profilePic = profilePic;

    await user.save();

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      profilePic: user.profilePic,
      bio: user.bio,
      website: user.website,
      followersCount: user.followers.length,
      followingCount: user.following.length,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST Follow / Unfollow user
router.post("/follow/:id", authMiddleware, async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!userToFollow) {
      return res.status(404).json({ error: "User not found" });
    }

    if (userToFollow._id.toString() === currentUser._id.toString()) {
      return res.status(400).json({ error: "You cannot follow yourself" });
    }

    const followIndex = currentUser.following.findIndex(id => id.toString() === userToFollow._id.toString());
    let followed = false;

    if (followIndex === -1) {
      // Follow
      currentUser.following.push(userToFollow._id);
      userToFollow.followers.push(currentUser._id);
      followed = true;

      // Create notification
      const notification = new Notification({
        recipient: userToFollow._id,
        sender: currentUser._id,
        senderUsername: currentUser.username,
        senderProfilePic: currentUser.profilePic,
        type: "follow",
        text: "started following you.",
      });
      await notification.save();
    } else {
      // Unfollow
      currentUser.following.splice(followIndex, 1);
      
      const followerIndex = userToFollow.followers.findIndex(id => id.toString() === currentUser._id.toString());
      if (followerIndex !== -1) {
        userToFollow.followers.splice(followerIndex, 1);
      }
    }

    await currentUser.save();
    await userToFollow.save();

    res.json({
      followed,
      followersCount: userToFollow.followers.length,
      followingCount: currentUser.following.length,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
