const express = require("express")

const router = express.Router()

const Story = require("../models/Story")

router.get("/",async(req,res)=>{
    const stories = await Story.find();
    res.json(stories);
})

module.exports = router;