const youtubeService = require("../services/youtubeService");

const getYouTubeVideo = async (req, res) => {
  const { songNames } = req.body;

  if (!songNames) {
    return res.status(400).json({ error: "Song name is required" });
  }

  try {
    const videoUrl = await youtubeService.fetchYoutubeVideoHelper(songNames);
    if (!videoUrl) {
      return res.status(404).json({ error: "No video found for the song" });
    }

    res.status(200).json({ songNames, videoUrl });
  } catch (error) {
    console.error("Error fetching YouTube video:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getYouTubeVideo };