const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  dialectModule: require("better-sqlite3"),
  storage: "urls.db"
});

module.exports = sequelize;