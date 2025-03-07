const express = require("express");
const youtubeController = require("../controllers/youtubeController");

const router = express.Router();

router.post("/youtube/video", youtubeController.getYouTubeVideo);


module.exports = router;