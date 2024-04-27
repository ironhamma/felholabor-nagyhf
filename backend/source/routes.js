const multer = require("multer");
const { publishMessage } = require("../publishMessage");
const { getImages } = require("./getImages");
const { uploadFiles } = require("./uploadFiles");
const { subscribeEmail } = require("./subscribeEmail");
const { getEmails } = require("./getEmails");

const upload = multer({ dest: "uploads/" });
const setUpRoutes = (app) => {
  app.get("/mqtest", (req, res) => {
    publishMessage();
    res.json({ message: "Message sent" });
  });

  app.get("/uploaded_images", getImages);

  app.post("/upload_files", upload.single("image"), uploadFiles);

  app.post("/subscribe", subscribeEmail);
  app.get("/emails", getEmails);
};

exports.setUpRoutes = setUpRoutes;
