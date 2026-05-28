const mongoose = require("mongoose");

const suggestionSchema = new mongoose.Schema(
  {
    id: String,

    username: String,

    fullName: String,

    profilePic: String,

    mutualFollowers: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Suggestion",
  suggestionSchema
);