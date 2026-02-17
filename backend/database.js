const mongoose = require("mongoose");

async function databaseConnection() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error; // Propagate error to stop server startup
  }
}

module.exports = databaseConnection;
