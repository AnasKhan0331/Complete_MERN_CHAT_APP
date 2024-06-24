const express = require("express");
const registerUser = require("../controller/registerUser");
const checkEmail = require("../controller/checkEmail");
const checkPassword = require("../controller/checkPassword");

const router = express.Router();
// register api
router.post("/register", registerUser);
// check email api
router.post("/email", checkEmail);
// check email api
router.post("/password", checkPassword);
module.exports = router;
