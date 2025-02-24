const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    Otp : {type: String},
    OtpExpiry: {type: Date},
    resetToken: { type: String },
    resetTokenExpiry: { type: Date }
}, { timestamps: true });

module.exports = mongoose.models.user || mongoose.model("user", userSchema);
