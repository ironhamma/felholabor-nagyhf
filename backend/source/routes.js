const express = require("express");
const path = require("path");
const multer = require("multer");
const { publishMessage } = require("../publishMessage");
const { getImages } = require("./getImages");
const { uploadFiles } = require("./uploadFiles");

const upload = multer({ dest: "uploads/" });

const setUpRoutes = (app) => {
  app.use("/uploaded_images", express.static(path.join(__dirname, "uploads")));

  app.get("/mqtest", (req, res) => {
    publishMessage();
    res.json({ message: "Message sent" });
  });

  app.get("/uploaded_images", getImages);

  app.post("/upload_files", upload.array("image"), uploadFiles);
};

exports.setUpRoutes = setUpRoutes;
