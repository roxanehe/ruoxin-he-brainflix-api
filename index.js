require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const videoRoutes = require("./routes/video.js");
app.use("/videos", videoRoutes);

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
