const authRoutes = require("../routes/authRoutes");
const userRoutes = require("../routes/userRoutes");
const transactionRoutes = require('./transactionRoutes');
const express = require("express");
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use('/transactions', transactionRoutes);
module.exports = router;