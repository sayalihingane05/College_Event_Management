const express = require("express");
const {
  sendOtp,
  verifyOtpAndRegister,
  loginUser
} = require("../controller/userController");

const router = express.Router();
router.get("/test", (req, res) => {
  res.send("USER ROUTES WORKING");
});

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtpAndRegister);
router.post("/login", loginUser);

module.exports = router;
