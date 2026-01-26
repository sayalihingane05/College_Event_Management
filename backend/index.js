



// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const databaseConnection = require("./database");

// const eventRoutes = require("./routes/eventRoutes");
// const userRoutes = require("./routes/userRoutes");
// const eventRegistrationRoutes = require("./routes/eventRegistrationRoutes");

// const app = express();

// // DB connection
// databaseConnection();

// // Middlewares
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use("/event", eventRoutes);
// app.use("/user", userRoutes);
// app.use("/event-registration", eventRegistrationRoutes);

// // Test route
// app.get("/", (req, res) => {
//   res.send("Server is working ✅");
// });

// // Start server
// module.exports = app;

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const databaseConnection = require("./database");

const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");
const eventRegistrationRoutes = require("./routes/eventRegistrationRoutes");

const app = express();

app.use(cors());
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




// {
//   "version": 2,
//   "builds": [
//     {
//       "src": "BACKEND/index.js",
//       "use": "@vercel/node"
//     }
//   ],
//   "routes": [
//     {
//       "src": "/(.*)",
//       "dest": "BACKEND/index.js"
//     }
//   ]
// }