//------------------------------------
// DOT Environment .env
//------------------------------------
const User = require("./models/User");
const cors = require("cors");

//Have Url mongoose & Port The Server
const dotenv = require("dotenv");
dotenv.config();

//--------------------------------------------------
// Setting up Express and activating JSON Middleware
//--------------------------------------------------

//Calling the Express library
const express = require("express");

// -----------------------------------------------------
//  Connect to MongoDB
// -----------------------------------------------------

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Coonected Successfully");
  })
  .catch((error) => {
    console.log("Error With Connection With The DB", error);
  });

//Create a new Express application
const app = express();
app.use(cors());

//Activate Middleware to convert JSON
app.use(express.json());

app.get("/", (request, respouns) => {
  respouns.send("Hello From the /");
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || password !== user.password) {
      return res.status(400).json({ message: "Incorrect password or email" });
    }
    res.json({ message: "login successful", email: email });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body; // Use Destructuring

  if (!name || !email || !password || password.length < 8) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const newUser = new User({ name, email, password });
    await newUser.save();

    const userToSend = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    };
    res.status(201).json(userToSend);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already exists" });
    } // if two person sigin up and insert same emil
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`I Am Listenig In Port ${process.env.PORT}`);
});
