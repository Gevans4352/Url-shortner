const express = require("express");
const User = require("../Models/User");
const protect = require("../Middleware/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const crypto = require("node:crypto");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const router = express.Router();
//register

router.get("/debug-user/:email", async (req, res) => {
  const user = await User.findOne({ where: { email: req.params.email } });
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({
    email: user.email,
    passwordHash: user.password,
    passwordLength: user.password.length,
    startsWithBcrypt: user.password.startsWith("$2"),
  });
});

router.get("/debug-all-users", async (req, res) => {
  const users = await User.findAll({ attributes: ["id", "email", "username"] });
  res.json({ count: users.length, users });
});

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please fill in all the fields",
      });
    }
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({
        message: "User already exist",
      });
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    const token = generateToken(user.id);

    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
});

//login

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill in all fields",
      });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }
    const token = generateToken(user.id);
    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

//me

router.get("/me", protect, async (req, res) => {
  res.status(200).json(req.user);
});

//Generate jwt tokens
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    //password only our server know
    expiresIn: "30d",
  });
};

// Forgot password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "No account with that email" });
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000;
    await user.save();
    const resetLink = `https://gevans4352.github.io/Url-shortner/#/restart/${resetToken}`;
    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Reset your password",
      html: `<p>Click the link below to reset your password. It expires in 1 hour.</p>
         <a href="${resetLink}">${resetLink}</a>`,
    });
    console.log("RESEND RESULT:", result);
    res.json({ message: "Reset link sent to your email" });
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        resetToken: token,
      },
    });
    if (!user || user.resetTokenExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired reset link" });
    }
    user.password = password;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();
    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
