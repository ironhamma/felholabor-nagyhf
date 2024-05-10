// server.js
const express = require("express");
const path = require("path");
const cors = require("cors");
const cron = require("node-cron");
// eslint-disable-next-line import/no-extraneous-dependencies
require("dotenv").config();

const { publishMessage } = require("./publishMessage");
const { consumeMessages } = require("./consumeMessages");
const { setUpRoutes } = require("./source/routes");
const config = require("./config");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "uploads")));

setUpRoutes(app);

app.listen(5000, async () => {
  console.log(`Server started on ${5000}`);
  await consumeMessages();
});

// Schedule task to run every day at 22:00
cron.schedule("* * * * *", () => {
  publishMessage();
});
