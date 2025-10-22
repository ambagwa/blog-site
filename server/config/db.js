// Connect to the DB
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Server connected successfully");
  } catch (error) {
    console.error("Server connection failed: ", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
