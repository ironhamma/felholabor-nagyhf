const express = require("express");
const path = require("path");
const multer = require("multer");
const { publishMessage } = require("../publishMessage");
const { getImages } = require("./getImages");
const { uploadFiles } = require("./uploadFiles");
const { subscribeEmail } = require("./subscribeEmail");
const { getEmails } = require("./getEmails");

const setUpRoutes = (app) => {
  const upload = multer({ dest: "uploads/" });
  app.use("/images", express.static(path.join(__dirname, "uploads")));

  app.get("/mqtest", (req, res) => {
    publishMessage();
    res.json({ message: "Message sent" });
  });

  app.get("/uploaded_images", getImages);

  app.post("/upload_files", upload.array("image"), uploadFiles);

  app.post("/subscribe", subscribeEmail);
  app.get("/emails", getEmails);
};

exports.setUpRoutes = setUpRoutes;
