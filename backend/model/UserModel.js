const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userScehma = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Provide UseName Please"],
    },
    email: {
      type: String,
      required: [true, "Provide Email Please"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Provide Password Please"],
      unique: true,
    },
    profile_pic: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userScehma.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

userScehma.pre("save", async function (next) {
  try {
    const salt = await bcryptjs.genSalt(12);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});
const UserModel = mongoose.model("User", userScehma);

module.exports = UserModel;
