const express = require("express");
const cors = require("cors");
const sequelize = require("./database");
const ShortUrl = require("./Models/shortUrl");
const User = require("./Models/User");
const authRoutes = require("./Route/auth");
const protect = require("./Middleware/auth");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define relationships ONCE
User.hasMany(ShortUrl, { foreignKey: "userId" });
ShortUrl.belongsTo(User, { foreignKey: "userId" });

app.use("/api/users", authRoutes);

app.get("/", (req, res) => {
  res.send("backend running");
});

// Get MY urls only
app.get("/shortUrls", protect, async (req, res) => {
  try {
    console.log("=== GET /shortUrls ===");
    console.log(
      "req.user:",
      req.user ? { id: req.user.id, email: req.user.email } : "NULL",
    );
    const urls = await ShortUrl.findAll({
      where: { userId: req.user.id },
    });
    res.json(urls);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch URLs" });
  }
});

// Create a URL (logged in users only)
app.post("/shortUrls", protect, async (req, res) => {
  try {
    console.log("=== POST /shortUrls ===");
    console.log("req.user:", req.user ? { id: req.user.id } : "NULL");
    console.log("body:", req.body);
    const url = await ShortUrl.create({
      full: req.body.fullUrl,
      userId: req.user.id,
    });
    res.json({ success: true, shortUrl: url.short });
  } catch (err) {
    res.status(500).json({ error: "Failed to create short URL" });
  }
});

// Redirect short link to original URL
app.get("/:shortUrl", async (req, res) => {
  try {
    const shortUrl = await ShortUrl.findOne({
      where: { short: req.params.shortUrl },
    });
    if (!shortUrl) {
      return res.status(404).send("Short URL not found");
    }
    shortUrl.clicks = (shortUrl.clicks || 0) + 1;
    await shortUrl.save();
    return res.redirect(shortUrl.full);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// ========== START SERVER ==========

sequelize.sync().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log("Server running on port 5000");
  });
});
