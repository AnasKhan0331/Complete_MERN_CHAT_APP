const express = require("express");
const registerUser = require("../controller/registerUser");
const checkEmail = require("../controller/checkEmail");
const checkPassword = require("../controller/checkPassword");
const userDetails = require("../controller/userDetails");
const logOut = require("../controller/logout");
const updateUserDetails = require("../controller/updateUserDetail");

const router = express.Router();
// register API
router.post("/register", registerUser);
// check email API
router.post("/email", checkEmail);
// check Password API
router.post("/password", checkPassword);
// check User Details API
router.get("/user-details", userDetails);
// check Logout API
router.get("/logout", logOut);
// check User Update API
router.get("/update-user", updateUserDetails);

module.exports = router;
