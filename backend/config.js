const config = {
  DETECTION_HOST: process.env.DETECTION_HOST || "localhost",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_NAME: process.env.DB_NAME || "images",
  DB_USER: process.env.DB_USER || "",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  MQ_HOST: process.env.MQ_HOST || "localhost",
  MAIL_USER: process.env.MAIL_USER || "",
  MAIL_PASS: process.env.MAIL_PASS || "",
};

module.exports = config;
