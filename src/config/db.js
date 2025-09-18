const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MonngoDB Connected Successfully");
  } catch (error) {
    console.error("DBConnection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
