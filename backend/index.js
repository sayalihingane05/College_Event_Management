
// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const databaseConnection = require("./database");

// const eventRoutes = require("./routes/eventRoutes");
// const userRoutes = require("./routes/userRoutes");



// const app = express();

// // DB connection
// databaseConnection();

// // Middlewares
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));





// // Test route
// app.get("/", (req, res) => {
//   res.send("Server is working ✅");
// });

// // Routes
// app.use("/event", eventRoutes);
// app.use("/user", userRoutes);


// // Start server
// app.listen(5000, () => {
//   console.log("App is listening on port 5000");
// });



require("dotenv").config();

const express = require("express");
const cors = require("cors");
const databaseConnection = require("./database");

const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");
const eventRegistrationRoutes = require("./routes/eventRegistrationRoutes");

const app = express();

// DB connection
databaseConnection();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/event", eventRoutes);
app.use("/user", userRoutes);
app.use("/event-registration", eventRegistrationRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Server is working ✅");
});

// Start server
app.listen(5000, () => {
  console.log("App is listening on port 5000");
});
