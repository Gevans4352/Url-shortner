const express = require("express");
const User = require("../Models/User");
const protect = require("../Middleware/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();
//register

// Temporary debug route - DELETE AFTER USE
router.get("/debug-user/:email", async (req, res) => {
  const user = await User.findOne({ where: { email: req.params.email } });
  if (!user) return res.status(404).json({ message: "User not found" });
  
  res.json({
    email: user.email,
    passwordHash: user.password,  // see if it's hashed or plain text
    passwordLength: user.password.length,
    startsWithBcrypt: user.password.startsWith('$2'),
  });
});

router.get("/debug-all-users", async (req, res) => {
  const users = await User.findAll({ attributes: ['id', 'email', 'username'] });
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

module.exports = router;
