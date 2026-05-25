const { Sequelize } = require("sequelize");
const path = require("path");  // add this

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "urls.db") 
});

module.exports = sequelize;