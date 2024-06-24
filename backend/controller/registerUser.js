const UserModel = require("../model/UserModel");
const bcryptjs = require("bcryptjs");
async function registerUser(req, res) {
  try {
    //Destructring data from userModel
    const { name, email, password, profile_pic } = req.body;

    //check whether user is already registered r not
    const checkEmail = await UserModel.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({
        message: "User Already Exists",
        error: true,
      });
    }
    //Now change Plane password into HasPasswor using bcrypt password
    const salt = await bcryptjs.genSalt(12);
    const hashpassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashpassword,
      profile_pic,
    };

    // Sending Data to Payload
    const user = new UserModel(payload);

    await user.save();

    return res.status(201).json({
      message: "User Created Successfully",
      data: { user },
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = registerUser;
