const User = require("../Models/User");
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findByPk(decoded.id); //find by primary key
      delete req.user.dataValues.password;
      if (req.user) {
        delete req.user.dataValues.password;
      }
      return next();
    } catch (error) {
      console.error("Token verification failed:", error.message);
      console.error("Full error:", error);
      return res.status(401).json({
        message: "Not Authorized, Token Failed",
      });
    }
  }
  if (!token) {
    return res.status(401).json({
      message: "Not Authorized, No Token",
    });
  }
};

module.exports = protect;
