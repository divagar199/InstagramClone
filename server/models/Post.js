const mongoose = require("mongoose");
require("dotenv").config();

const postSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    userProfilePic: {
      type: String,
    },

    imageUrl: {
      type: String,
    },

    caption: {
      type: String,
    },

    location: {
      type: String,
    },

    likes: {
      type: Number,
      default: 0,
    },

    comments: {
      type: Number,
      default: 0,
    },

    shares: {
      type: Number,
      default: 0,
    },

    reposts: {
      type: Number,
      default: 0,
    },

    timestamp: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Post", postSchema);

