const express = require("express");
const router = express.Router();
const Story = require("../models/Story");

// Get all stories
router.get("/", async (req, res) => {
    const stories = await Story.find();
    res.json(stories);
});

// Get a single story by ID (Required for ViewStory.jsx)
router.get("/:id", async (req, res) => {
    try {
        const story = await Story.findOne({ id: req.params.id });
        if (!story) return res.status(404).json({ message: "Story not found" });
        res.json(story);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;