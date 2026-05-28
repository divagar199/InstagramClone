const mongoose = require("mongoose");

const highlightSchema = new mongoose.Schema({
  id: String,
  title: String,
  coverImage: String,
});

const userPostSchema = new mongoose.Schema({
  id: String,
  mediaType: String,
  imageUrl: String,
  videoUrl: String,
  caption: String,
  likes: Number,
  comments: Number,
  timestamp: Date,
});

const profileSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    fullName: {
      type: String,
    },

    bio: {
      type: String,
    },

    profilePic: {
      type: String,
    },

    followers: {
      type: Number,
      default: 0,
    },

    following: {
      type: Number,
      default: 0,
    },

    posts: {
      type: Number,
      default: 0,
    },

    location: {
      type: String,
    },

    website: {
      type: String,
    },

    email: {
      type: String,
    },

    highlights: [highlightSchema],

    userposts: [userPostSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Profile", profileSchema);