const express = require("express");
const registerUser = require("../controller/registerUser");
const checkEmail = require("../controller/checkEmail");
const checkPassword = require("../controller/checkPassword");
const userDetails = require("../controller/userDetails");
const logOut = require("../controller/logout");
const searchUserFile = require("../controller/searchUser");
const updateUserDetails = require("../controller/updateUserDetail");

const router = express.Router();

// Register API
router.post("/register", registerUser);
// Check Email API
router.post("/email", checkEmail);
// Check Password API
router.post("/password", checkPassword);
// User Details API
router.get("/user-details", userDetails);
// Logout API
router.get("/logout", logOut);
// Update User Details API
router.post("/update-user", updateUserDetails);
// Search User API
router.post("/search-user", searchUserFile);

module.exports = router;
