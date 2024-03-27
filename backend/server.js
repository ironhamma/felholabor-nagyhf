// server.js
const express = require("express");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const axios = require("axios");
const cron = require('node-cron');
// eslint-disable-next-line import/no-extraneous-dependencies
const FormData = require("form-data");
require("dotenv").config();

const DETECTION_HOST = process.env.DETECTION_HOST || "localhost";

const { Image } = require("./models/Image");
const { publishMessage } = require("./publishMessage");
const { consumeMessages } = require("./consumeMessages");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/uploaded_images", express.static(path.join(__dirname, "uploads")));

const getImages = async (req, res) => {
  const images = await Image.findAll({ raw: true });
  res.json({
    images: images.map((image) => ({
      image: image.image,
      caption: image.caption,
      detections: image.detection,
    })),
  });
};

app.get('/mqtest', (req, res) => {
  publishMessage();
  res.json({ message: 'Message sent' });
});

app.get("/uploaded_images", getImages);

async function uploadFiles(req, res) {
  const formData = new FormData();
  formData.append("image", fs.createReadStream(req.files[0].path));

  const { data } = await axios.post(
    `http://${DETECTION_HOST}:4000/detect_cars`,
    formData,
    {
      headers: { ...formData.getHeaders() },
    },
  );

  const detection = data.cars;

  const uploadedImages = req.files.map(async (file) => {
    await Image.create({
      image: file.filename,
      caption: req.body.caption,
      detection,
    });
  });

  res.json({ message: "Successfully uploaded files", uploadedImages });
}

app.post("/upload_files", upload.array("image"), uploadFiles);

app.listen(5000, async () => {
  console.log(`Server started on ${5000}`);
  await consumeMessages();
});

// Schedule task to run every day at 22:00
cron.schedule('0 22 * * *', () => {
  publishMessage()
});