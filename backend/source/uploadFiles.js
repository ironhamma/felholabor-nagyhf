const axios = require("axios");
const fs = require("fs");
// eslint-disable-next-line import/no-extraneous-dependencies
const FormData = require("form-data");
const { DETECTION_HOST } = require("../config");
const { Image } = require("../models/db");

async function uploadFiles(req, res) {
  try{
    const formData = new FormData();
    formData.append("image", fs.createReadStream(req.file.path));
    
    const { data } = await axios.post(
      `http://${DETECTION_HOST}/detect_cars`,
      formData,
      {
        headers: { ...formData.getHeaders() },
      },
    );
    
    const detection = data.cars;
    
    const uploadedImages = await Image.create({
      image: req.file.filename,
      caption: req.body.caption,
      detection,
    });
    
    res.json({ message: "Successfully uploaded files", uploadedImages });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to upload files" });
  }
}

exports.uploadFiles = uploadFiles;
