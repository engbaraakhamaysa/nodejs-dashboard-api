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
    return res.status(500).json({ massage: "Server Error" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  if (!name || !email || !password || password.length < 8) {
    return res.status(400).json({ error: "Invalid Input" });
  }

  try {
    const existingUser = await User.findOne({ email, _id: { $ne: id } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: "Server error" });
  }
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password || password.length < 8) {
    return res.status(400).json({ error: "Invalid Input" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email Already exists" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(200).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already axists" });
    }
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { allUsers, deleteUser, findUser, updateUser, createUser };
