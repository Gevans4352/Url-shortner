const { Sequelize } = require("sequelize");
const Database = require("better-sqlite3");

const sequelize = new Sequelize({
  dialect: "sqlite",
  dialectModule: Database,
  storage: "/tmp/urls.db"
});

module.exports = sequelize;