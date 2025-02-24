const authController = require("../controllers/authController");
const express = require("express");
const router = express.Router();
const OtpVerification = require("../controllers/OtpVerification");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/send-otp", OtpVerification.sendOtp);
router.post("/verify-otp", OtpVerification.verifyOtp);
module.exports = router;

