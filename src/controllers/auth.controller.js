const { model } = require("mongoose");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const {
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  JWT_EXPIRES,
  JWT_REFRESH_EXPIRES,
} = require("../config/token");

const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
};
//Signup Controller
const signup = async (req, res) => {
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
    const accessToken = generateAccessToken(newUser._id);

    res.status(200).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      accessToken,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already axists" });
    }
    res.status(500).json({ error: "Server error" });
  }
};

//Login Controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || password !== user.password) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    const accessToken = generateAccessToken(user._id);
    res.json({
      message: "Login Successful",
      email: user.email,
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Sever error", error: error.message });
  }
};

module.exports = { signup, login };
