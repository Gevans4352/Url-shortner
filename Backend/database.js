const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "/tmp/urls.db"
});

module.exports = sequelize;