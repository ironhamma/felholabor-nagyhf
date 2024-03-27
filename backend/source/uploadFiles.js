const axios = require("axios");
const fs = require("fs");
const { DETECTION_HOST } = require("../config");
const { Image } = require("../models/db");

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

exports.uploadFiles = uploadFiles;
