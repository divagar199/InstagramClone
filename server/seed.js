const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("./config/db");
const Post = require("./models/Post");
const Profile = require("./models/Profile");
const Story = require("./models/Story");
const Suggestion = require("./models/Suggestion");

const dbPath = path.join(__dirname, "..", "client", "db", "db.json");

async function seedDatabase() {
  try {
    await connectDB();

    const raw = fs.readFileSync(dbPath, "utf8");
    const data = JSON.parse(raw);

    await Promise.all([
      Post.deleteMany(),
      Profile.deleteMany(),
      Story.deleteMany(),
      Suggestion.deleteMany(),
    ]);

    const posts = Array.isArray(data.posts) ? data.posts : [];
    const profile = data.profile ? [data.profile] : [];
    const stories = Array.isArray(data.Story) ? data.Story : [];
    const suggestions = Array.isArray(data.suggestions) ? data.suggestions : [];

    await Promise.all([
      Post.insertMany(posts),
      Profile.insertMany(profile),
      Story.insertMany(stories),
      Suggestion.insertMany(suggestions),
    ]);

    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
