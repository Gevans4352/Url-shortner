const express = require("express");
const cors = require("cors");
const sequelize = require("./database");
const ShortUrl = require("./Models/ShortUrl");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("backend running");
});
app.get("/shortUrls", async (req, res) => {
  const urls = await ShortUrl.findAll();
  res.json(urls);
});

app.post("/shortUrls", async (req, res) => {
  try {
    await ShortUrl.create({
      full: req.body.fullUrl
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to create short URL" });
  }
});

app.get("/:shortUrl", async (req, res) => {
  try {
    const shortUrl = await ShortUrl.findOne({
      where: { short: req.params.shortUrl }
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

sequelize.sync().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log("Server running on port 5000");
  });
});