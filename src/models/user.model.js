const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Remove spaces from the beginning and end
  },
  email: {
    type: String,
    required: true,
    trim: true, // Remove spaces from the beginning and end
    unique: true, //Ensures that emails are not duplicated in the database.
  },
  password: {
    type: String,
    required: true,
    minlength: 8, // Minimum number of characters
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
