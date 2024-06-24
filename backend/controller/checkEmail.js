const User = require("../model/UserModel");

async function checkEmail(req, res) {
  try {
    const { email } = req.body;

    const checkEmail = await User.findOne({ email }, "name email");
    if (!checkEmail) {
      return res.status(400).json({
        message: "User not Exist",
        error: true,
      });
    } else {
      return res.status(200).json({
        message: "Email Verified",
        success: true,
        data: checkEmail,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = checkEmail;
