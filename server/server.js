const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const postRoutes = require("./routes/postRoutes");
const storyRoutes = require("./routes/storyRoutes");
const suggestionRoutes = require("./routes/suggestionRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/suggestions", suggestionRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);

// Fallback legacy route handlers for compatibility with baseline client if needed
app.use("/api/profile", userRoutes); 
app.use("/profile", async (req, res) => {
  // Alias for getting a default profile
  const User = require("./models/User");
  const defaultUser = await User.findOne();
  if (defaultUser) {
    const profileObj = defaultUser.toObject();
    profileObj.highlights = [
      { id: "h1", title: "Setup 🖥️", coverImage: "https://picsum.photos/seed/high1/150/150" },
      { id: "h2", title: "Travel ✈️", coverImage: "https://picsum.photos/seed/high2/150/150" },
      { id: "h3", title: "Projects 🚀", coverImage: "https://picsum.photos/seed/high3/150/150" },
      { id: "h4", title: "Food 🍕", coverImage: "https://picsum.photos/seed/high4/150/150" },
      { id: "h5", title: "Q&A 💬", coverImage: "https://picsum.photos/seed/high5/150/150" },
      { id: "h6", title: "Setup 🖥️", coverImage: "https://picsum.photos/seed/high1/150/150" },
      { id: "h7", title: "Travel ✈️", coverImage: "https://picsum.photos/seed/high2/150/150" }
    ];
    res.json(profileObj);
  } else {
    res.status(404).json({ error: "No users found" });
  }
});

// server
const PORT = process.env.PORT || 3000;

// Connect to Database and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });
});
