const { Image } = require("../models/db");

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

exports.getImages = getImages;
