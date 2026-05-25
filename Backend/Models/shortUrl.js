const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const shortId = require("shortid");

const ShortUrl = sequelize.define("ShortUrl", {
  full: {
    type: DataTypes.STRING,
    allowNull: false
  },
  short: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    defaultValue: shortId.generate
  },
  clicks: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
   userId: {
    type: DataTypes.INTEGER,
    allowNull: false  // every URL MUST belong to someone
  }
});

module.exports = ShortUrl;