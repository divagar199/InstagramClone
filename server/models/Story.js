const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    id: String,

    username: String,

    userProfilePic: String,

    mediaType: String,

    mediaUrl: String,

    duration: Number,

    caption: String,

    timestamp: Date,

    views: Number,

    likes: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Story", storySchema);