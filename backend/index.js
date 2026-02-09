

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const databaseConnection = require("./database");

const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");
const eventRegistrationRoutes = require("./routes/eventRegistrationRoutes");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      // Allow localhost (dev) and all Vercel deployments
      if (
        origin.startsWith("http://localhost") ||
        origin.endsWith(".vercel.app")
      ) {
        return callback(null, true);
      }

      console.log("❌ Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);

/* ===== BODY PARSER ===== */
app.use(express.json());

/* ===== ROUTES ===== */
app.use("/event", eventRoutes);
app.use("/user", userRoutes);
app.use("/event-registration", eventRegistrationRoutes);

/* ===== TEST ROUTE ===== */
app.get("/", (req, res) => {
  res.send("SERVER FULLY WORKING ✅");
});

/* ===== PORT ===== */
const PORT = process.env.PORT || 5000;

/* ===== START SERVER ===== */
databaseConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed", err);
  });
