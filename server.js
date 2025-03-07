require("dotenv").config();
const express = require("express");
const youtubeRoutes = require("./src/routes/youtubeRoutes");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: "https://musicvault-frontend.onrender.com",
    credentials: true,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  })
);

app.use(express.json());

app.use("/api", youtubeRoutes);

app.listen(PORT, () => {
  console.log(`YouTube Service running on http://localhost:${PORT}`);
});