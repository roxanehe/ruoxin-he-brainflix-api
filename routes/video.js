const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const readfile = () => {
  return JSON.parse(fs.readFileSync("./data/video-details.json"));
};

function savevideos(videos) {
  fs.writeFileSync("./data/video-details.json", JSON.stringify(videos));
}

router.post("/", (req, res) => {
  const { title, description } = req.body;
  const newvideo = {
    id: uuidv4(),
    title,
    channel: "Red Cow",
    image: "http://localhost:8000/images/Upload-video-preview.jpg",
    description,
    views: "0",
    likes: "0",
    duration: "4:01",
    video: "https://project-2-api.herokuapp.com/stream",
    timestamp: new Date(),
    comments: [
      {
        id: "35bba08b-1b51-4153-ba7e-6da76b5ec1b9",
        name: "anonymous",
        comment: "Thanks for uploading a new video",
        likes: 0,
        timestamp: new Date(),
      },
    ],
  };
  const videos = readfile();
  videos.push(newvideo);
  savevideos(videos);
  res.status(201).json(videos);
});

router.get("/", (req, res) => {
  const videoData = readfile();
  const videoList = videoData.map((video) => {
    return {
      id: video.id,
      title: video.title,
      channel: video.channel,
      image: video.image,
    };
  });
  res.status(200).json(videoList);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const allvideos = readfile().find((video) => video.id === id);
  res.status(200).json(allvideos);
});

module.exports = router;
