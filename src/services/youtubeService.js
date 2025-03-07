const axios = require("axios");
const { YOUTUBE_API_URL } = require("../config/constants");
const { publishYouTubeLink } = require("../utils/redisUtils");

const fetchYouTubeVideo = async (songName) => {
  const query = `${songName} song`;

  // const cachedUrl = await redisCache.get(`youtube:${query}`);
  // if (cachedUrl) {
  //   console.log(`Cache hit for: ${query}`);
  //   return cachedUrl;
  // }

  const searchResponse = await axios.get(YOUTUBE_API_URL, {
    params: {
      part: "snippet",
      q: query,
      key: process.env.YOUTUBE_API_KEY,
      maxResults: 1,
      type: "video",
      // videoDuration: "medium",
    },
  });

  const videoItem = searchResponse.data.items[0];
  if (!videoItem) return null;

  const videoUrl = `https://www.youtube.com/watch?v=${videoItem.id.videoId}`;
  await publishYouTubeLink("youtube:link", videoUrl);

  return videoItem.id.videoId;
};

const fetchYoutubeVideoHelper = async (songNames) => {
  try {
    const videoUrls = await Promise.all(
      songNames.map(async (songName) => {
        return await fetchYouTubeVideo(songName);
      })
    );
    return videoUrls;
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    throw error;
  }
};


module.exports = { fetchYoutubeVideoHelper };