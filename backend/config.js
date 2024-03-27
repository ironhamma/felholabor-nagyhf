const MQ_HOST = process.env.MQ_HOST || "localhost";
const MAIL_USER = process.env.MAIL_USER || '';
const MAIL_PASS = process.env.MAIL_PASS || '';

exports.MQ_HOST = MQ_HOST;
exports.MAIL_USER = MAIL_USER;
exports.MAIL_PASS = MAIL_PASS;