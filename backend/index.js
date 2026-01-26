

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const databaseConnection = require("./database");

const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");
const eventRegistrationRoutes = require("./routes/eventRegistrationRoutes");

const app = express();

app.use(cors({
  origin: "https://your-frontend-url.vercel.app", // frontend deployed URL
  credentials: true
}));

app.use(express.json());

app.use("/event", eventRoutes);
app.use("/user", userRoutes);
app.use("/event-registration", eventRegistrationRoutes);

app.get("/", (req, res) => {
  res.send("SERVER FULLY WORKING ✅");
});

// connect DB last
databaseConnection();

module.exports = app;




