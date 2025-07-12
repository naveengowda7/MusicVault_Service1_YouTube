const { createClient } = require("redis");

const client = createClient({
  username: "default",
  password: "hVsuxkFLreWnHflApANxVpB8vcwjZHD2",
  socket: {
    host: "redis-14273.c301.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 14273,
  },
});

redisPub.connect().catch(console.error);




const publishYouTubeLink = async (channel, link) => {
  try {
    await redisPub.publish(channel, JSON.stringify(link));
    console.log(`Published YouTube link to ${channel}: ${link}`);
  } catch (error) {
    console.error("Error publishing YouTube link:", error);
  }
};

module.exports = { redisPub, publishYouTubeLink };
