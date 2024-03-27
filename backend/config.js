const config = {
  MQ_HOST: process.env.MQ_HOST || "localhost",
  MAIL_USER: process.env.MAIL_USER || "",
  MAIL_PASS: process.env.MAIL_PASS || "",
  DETECTION_HOST: process.env.DETECTION_HOST || "localhost",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_USER: process.env.DB_USER || "",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_NAME: process.env.DB_NAME || "images",
};

module.exports = config;
