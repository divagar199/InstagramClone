const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const postRoutes = require("./routes/postRoutes");
const profileRoutes = require("./routes/profileRoutes");
const storyRoutes = require("./routes/storyRoutes");
const suggestionRoutes = require("./routes/suggestionRoutes");

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api/posts", postRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/suggestions", suggestionRoutes);

//server
const PORT = process.env.PORT || 3000;

// Connect to Database and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });
});
