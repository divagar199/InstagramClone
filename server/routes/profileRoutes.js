const express = require("express");

const router = express.Router();

const Profile = require("../models/Profile")

router.get("/",async(req,res)=>{
    const profiles = await Profile.find();
    res.json(profiles);
}) 
module.exports = router;