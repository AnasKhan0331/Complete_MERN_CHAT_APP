const UserModel = require("../model/UserModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function checkPassword(req, res) {
  try {
    const { password, userId } = req.body;
    const user = await UserModel.findById(userId);
    const verifyPassword = await bcryptjs.compare(password, user.password);

    if (!verifyPassword) {
      return res.status(400).json({
        message: "Please Check Password",
        error: true,
      });
    }

    const tokenData = {
      id: user._id,
      email: user.email,
    };

    const cookiesOptions = {
      http: true,
      secure: true,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "200d",
    });

    return res.cookie("token", token, cookiesOptions).status(200).json({
      message: " Login Successfully",
      data: token,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      messsage: error.message || error,
      error: true,
    });
  }
}

module.exports = checkPassword;
