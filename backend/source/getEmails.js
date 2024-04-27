const { Admin } = require("../models/db");

const getEmails = async (req, res) => {
  const emails = await Admin.findAll({ raw: true });
  res.json({ emails });
};

exports.getEmails = getEmails;
