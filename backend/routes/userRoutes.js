const express = require("express");
const {
  sendOtp,
  verifyOtpAndRegister,
  loginUser
} = require("../controller/userController");

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtpAndRegister);
router.post("/login", loginUser);

module.exports = router;
