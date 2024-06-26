const jwt = require("jsonwebtoken");
const UserModel = require("../model/UserModel");

const getUserDetailsFromToken = async (token) => {
  if (!token) {
    return {
      message: "Session Out",
      logout: true,
    };
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await UserModel.findById(decode.id);

    if (!user) {
      return {
        message: "User not found",
        error: true,
        logout: true,
      };
    }

    return user;
  } catch (error) {
    return {
      message: "Invalid Token",
      error: true,
      logout: true,
    };
  }
};

module.exports = getUserDetailsFromToken;
