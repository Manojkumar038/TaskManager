const authRoutes = require("../routes/authRoutes");
const userRoutes = require("../routes/userRoutes");
const express = require("express");
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
module.exports = router;