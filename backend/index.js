// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const databaseConnection = require("./database");

// const eventRoutes = require("./routes/eventRoutes");
// const userRoutes = require("./routes/userRoutes");
// const eventRegistrationRoutes = require("./routes/eventRegistrationRoutes");

// const app = express();

// /* ===== CORS ===== */
// app.use(
//   cors({
//     origin: 
//       "https://college-event-management-zjh1.vercel.app",
//       credentials:true 
//     }) // vercel frontend
// );

// app.use(express.json());

// /* ===== ROUTES ===== */
// app.use("/event", eventRoutes);
// app.use("/user", userRoutes);
// app.use("/event-registration", eventRegistrationRoutes);

// app.get("/", (req, res) => {
//   res.send("SERVER FULLY WORKING ✅");
// });

// /* ===== PORT ===== */
// const PORT = process.env.PORT || 5000;

// /* ===== START SERVER ===== */
// databaseConnection()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ DB connection failed", err);
//   });



require("dotenv").config();
const express = require("express");
const cors = require("cors");
const databaseConnection = require("./database");

const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");
const eventRegistrationRoutes = require("./routes/eventRegistrationRoutes");

const app = express();

/* ===== CORS CONFIGURATION ===== */
app.use(
  cors({
    origin: "https://college-event-management-zjh1.vercel.app", // only Vercel frontend
    credentials: true // allow cookies/auth headers
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
