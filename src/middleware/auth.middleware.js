const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { JWT_SECRET } = require("../config/token");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "Access token missing" });

  const token = authHeader.split(" ")[1]; // Bearer <token>
  if (!token) return res.status(401).json({ message: "Access token missing" });

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(payload.id);
    if (!user || user.token !== token) {
      return res
        .status(403)
        .json({ message: "Invalid or expired access token" });
    }

    req.userId = payload.id;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired access token" });
  }
};

module.exports = auth;
