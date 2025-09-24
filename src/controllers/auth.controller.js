const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { JWT_SECRET, JWT_EXPIRES } = require("../config/token");

const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
};

// Signup
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password || password.length < 8) {
      return res.status(400).json({ error: "Invalid Input" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email Already exists" });

    const newUser = new User({ name, email, password });
    await newUser.save();

    const accessToken = generateAccessToken(newUser._id);
    newUser.token = accessToken;
    await newUser.save();

    res.status(200).json({
      user: { _id: newUser._id, name: newUser.name, email: newUser.email },
      token: accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    const accessToken = generateAccessToken(user._id);
    user.token = accessToken;
    await user.save();

    res.status(200).json({
      user: { _id: user._id, name: user.name, email: user.email },
      token: accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Refresh access token
const refreshToken = async (req, res) => {
  const authHeader = req.headers.authorization; // Authorization: Bearer <oldAccessToken>
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const payload = jwt.verify(token, JWT_SECRET, { ignoreExpiration: true });

    const user = await User.findById(payload.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newAccessToken = generateAccessToken(user._id);
    user.token = newAccessToken;
    await user.save();

    res.json({
      user: { _id: user._id, name: user.name, email: user.email },
      token: newAccessToken,
    });
  } catch (err) {
    console.log("Refresh token error:", err.message);
    res.status(403).json({ message: "Invalid token" });
  }
};

const logout = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Bearer <token>

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.id);
    if (user) {
      user.token = null;
      await user.save();
    }
    res.clearCookie("Bearer", {
      httpOnly: true,
      sameSite: "Strict",
      path: "/",
    });

    res
      .status(200)
      .json({ message: "Logged out successfully", userId: payload.id });
  } catch (err) {
    console.error("Logout error:", err.message);
    res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = { signup, login, refreshToken, logout };
