const User = require("../models/user.model");

const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (erorr) {
    res.status(400).json({ error: "Server error" });
  }
};

module.exports = allUsers;
