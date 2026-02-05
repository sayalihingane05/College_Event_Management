

// const User = require("../model/user");
// const nodemailer = require("nodemailer");

// // ✅ TEMP OTP STORE
// const otpStore = {};

// // SEND OTP
// const sendOtp = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ message: "Email is required" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000);
//     otpStore[email] = otp;

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL,
//         pass: process.env.EMAIL_PASS
//       }
//     });

//     await transporter.sendMail({
//       from: process.env.EMAIL,
//       to: email,
//       subject: "College Event Registration OTP",
//       text: `Your OTP is ${otp}`
//     });

//     res.status(200).json({ message: "OTP sent to email" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // VERIFY OTP + REGISTER
// const verifyOtpAndRegister = async (req, res) => {
//   try {
//     const { name, email, password, otp } = req.body;

//     if (!name || !email || !password || !otp) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     if (otpStore[email] != otp) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }

//     await User.create({ name, email, password });

//     delete otpStore[email];

//     res.status(200).json({ message: "Registration successful" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // LOGIN (UNCHANGED)
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     if (user.password !== password) {
//       return res.status(400).json({ message: "Invalid password" });
//     }

//     res.status(200).json({
//       message: "Login successful",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email
//       }
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = {
//   sendOtp,
//   verifyOtpAndRegister,
//   loginUser
// };



const User = require("../model/user");
const nodemailer = require("nodemailer");

// TEMP OTP STORE
const otpStore = {};

// ================= SEND OTP =================
const sendOtp = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[email] = otp;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "College Event Registration OTP",
      text: `Your OTP is ${otp}`
    });

    res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= VERIFY OTP & REGISTER =================
const verifyOtpAndRegister = async (req, res) => {
  try {
    const name = req.body.name?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password?.trim();
    const otp = req.body.otp?.trim();

    if (!name || !email || !password || !otp) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (otpStore[email] != otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    await User.create({ name, email, password });

    delete otpStore[email];

    res.status(200).json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= LOGIN =================
const loginUser = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password?.trim();

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  sendOtp,
  verifyOtpAndRegister,
  loginUser
};
