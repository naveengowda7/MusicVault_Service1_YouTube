const { createClient } = require("redis");

const redisPub = createClient({
  username: "default",
  password: "9916545887",
  socket: {
    host: "redis-10383.crce182.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 10383,
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
