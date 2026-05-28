const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const User = require("./models/User");
const Post = require("./models/Post");
const Story = require("./models/Story");

const dbPath = path.join(__dirname, "../client/db/db.json");
const rawData = fs.readFileSync(dbPath, "utf8");
const parsedData = JSON.parse(rawData);

const seedDatabase = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGO_DB);
    console.log("Connected to MongoDB for Seeding...");

    // Clear existing collections
    await User.deleteMany({});
    await Post.deleteMany({});
    await Story.deleteMany({});
    console.log("Cleared existing data.");

    // Create some default users
    const defaultPassword = "password123";
    
    // We will extract unique usernames from the posts, profile, suggestions, and stories
    const userNamesSet = new Set();
    
    // 1. Arjun Kumar (Main Profile)
    const arjunUsername = parsedData.profile.username.toLowerCase();
    userNamesSet.add(arjunUsername);
    
    // 2. Suggestions usernames
    parsedData.suggestions.forEach(s => userNamesSet.add(s.username.toLowerCase()));
    
    // 3. Posts usernames
    parsedData.posts.forEach(p => userNamesSet.add(p.username.toLowerCase()));

    // 4. Stories usernames
    parsedData.Story.forEach(s => userNamesSet.add(s.username.toLowerCase()));

    console.log(`Discovered ${userNamesSet.size} unique users to create.`);

    // Map profiles
    const usersMap = {}; // username -> User Document

    // Create Main User first
    const mainUser = new User({
      username: arjunUsername,
      email: `${arjunUsername}@example.com`,
      password: defaultPassword,
      fullName: parsedData.profile.fullName,
      profilePic: parsedData.profile.profilePic || "https://randomuser.me/api/portraits/men/1.jpg",
      bio: parsedData.profile.bio,
      website: parsedData.profile.website,
    });
    await mainUser.save();
    usersMap[arjunUsername] = mainUser;

    // Create all other users
    for (const username of userNamesSet) {
      if (username === arjunUsername) continue;

      // Find matching suggestion or post for info
      const sugg = parsedData.suggestions.find(s => s.username.toLowerCase() === username);
      const post = parsedData.posts.find(p => p.username.toLowerCase() === username);
      const story = parsedData.Story.find(s => s.username.toLowerCase() === username);

      const fullName = (sugg && sugg.fullName) || (post && post.username) || (story && story.username) || username;
      const profilePic = (sugg && sugg.profilePic) || (post && post.userProfilePic) || (story && story.userProfilePic) || `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 90) + 1}.jpg`;

      const user = new User({
        username,
        email: `${username}@example.com`,
        password: defaultPassword,
        fullName,
        profilePic,
        bio: `Hey there! I am ${fullName}, sharing my creative work here. #creative #insta`,
      });

      await user.save();
      usersMap[username] = user;
    }

    console.log("Successfully created all users.");

    // Seed Posts
    for (const postData of parsedData.posts) {
      const author = usersMap[postData.username.toLowerCase()] || mainUser;
      
      // Select some random users to like this post
      const totalLikesCount = Math.min(postData.likes, 15);
      const postLikes = [];
      const usersList = Object.values(usersMap);
      for (let i = 0; i < totalLikesCount; i++) {
        const randomUser = usersList[Math.floor(Math.random() * usersList.length)];
        if (!postLikes.includes(randomUser._id)) {
          postLikes.push(randomUser._id);
        }
      }

      // Add a couple of realistic comments
      const postComments = [];
      const commentsList = [
        "This is absolutely amazing! 🔥",
        "Love the vibe in this shot! 🙌",
        "Could you share more details about the setup?",
        "Outstanding! Keep it up!",
        "Stunning composition, Arjun!",
        "Incredible stuff. Just followed!",
        "Perfect lighting. Teach me your ways!",
      ];

      const commentCount = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < commentCount; j++) {
        const commentUser = usersList[Math.floor(Math.random() * usersList.length)];
        postComments.push({
          user: commentUser._id,
          username: commentUser.username,
          userProfilePic: commentUser.profilePic,
          text: commentsList[Math.floor(Math.random() * commentsList.length)],
          timestamp: new Date(Date.now() - Math.floor(Math.random() * 10000000)),
        });
      }

      const post = new Post({
        user: author._id,
        username: author.username,
        userProfilePic: author.profilePic,
        imageUrl: postData.imageUrl,
        caption: postData.caption,
        location: postData.location,
        likes: postLikes,
        comments: postComments,
        shares: postData.shares || 0,
        reposts: postData.reposts || 0,
        createdAt: new Date(postData.timestamp),
      });

      await post.save();
    }

    console.log("Successfully seeded all posts.");

    // Seed Stories
    for (const storyData of parsedData.Story) {
      const author = usersMap[storyData.username.toLowerCase()] || mainUser;
      
      const story = new Story({
        user: author._id,
        username: author.username,
        userProfilePic: author.profilePic,
        mediaType: storyData.mediaType || "image",
        mediaUrl: storyData.mediaUrl,
        duration: storyData.duration || 5,
        caption: storyData.caption || "",
        views: storyData.views || 0,
        likes: storyData.likes || 0,
        createdAt: new Date(storyData.timestamp),
      });

      await story.save();
    }

    console.log("Successfully seeded all stories.");

    // Setup follow relationships
    // Make mainUser follow a few people, and a few people follow mainUser
    const allUsers = Object.values(usersMap);
    for (const user of allUsers) {
      if (user._id.toString() === mainUser._id.toString()) continue;

      // 50% chance of mutual following
      if (Math.random() > 0.3) {
        mainUser.following.push(user._id);
        user.followers.push(mainUser._id);
      }
      if (Math.random() > 0.3) {
        mainUser.followers.push(user._id);
        user.following.push(mainUser._id);
      }
      await user.save();
    }
    await mainUser.save();

    console.log("Successfully created follow dynamics.");
    console.log("Database successfully seeded! 🌱");
    process.exit(0);
  } catch (err) {
    console.error("Seeding Error:", err);
    process.exit(1);
  }
};

seedDatabase();
