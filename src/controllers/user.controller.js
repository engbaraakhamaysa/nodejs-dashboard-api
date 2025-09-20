const User = require("../models/user.model");

const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (erorr) {
    res.status(400).json({ error: "Server error" });
  }
};

const findUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json("User Not Found");
    }
    return res.status(200).json(user);
  } catch (erorr) {
    return res.status(500).json("Server Error", error);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params; //  const id = req.params.id;

  try {
    const deletUser = await User.findById(id);
    if (!deletUser) {
      return res.status(400).json("User Not Found");
    }
    await User.findByIdAndDelete(id);
    return res.status(200).json("User Deleted Successfully");
  } catch (error) {
    return res.status(500).json("Server Error", error);
  }
};

module.exports = { allUsers, deleteUser, findUser };
