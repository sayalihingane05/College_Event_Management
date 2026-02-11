const express = require("express");
const {
  registerUser,
  loginUser
} = require("../controller/userController");

const router = express.Router();
router.get("/test", (req, res) => {
  res.send("USER ROUTES WORKING");
});

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
