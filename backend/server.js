// server.js
const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
// eslint-disable-next-line import/no-extraneous-dependencies
require("dotenv").config();

const { publishMessage } = require("./publishMessage");
const { consumeMessages } = require("./consumeMessages");
const { setUpRoutes } = require("./source/routes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

setUpRoutes(app);

app.listen(5000, async () => {
  console.log(`Server started on ${5000}`);
  await consumeMessages();
});

// Schedule task to run every day at 22:00
cron.schedule("0 22 * * *", () => {
  publishMessage();
});
