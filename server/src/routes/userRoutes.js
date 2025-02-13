const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {forgot_password} = require("../controllers/forgotPasswordController");
const {reset_password }= require("../controllers/resetPasswordController");


router.get("/profile", authMiddleware, (req, res) => {
    res.json({ message: "Welcome to your profile!", user: req.user });
});

router.post("/forgot-password", forgot_password);
router.post("/reset-password", reset_password);

module.exports = router;
