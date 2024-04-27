const { Admin } = require("../models/db");

const subscribeEmail = async (req, res) => {
  console.log(req.query, req.params, req.body);

  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: "Email is required" });
    return;
  }

  await Admin.create({ email });

  res.status(200).json({ message: "Subscribed" });
};

exports.subscribeEmail = subscribeEmail;
