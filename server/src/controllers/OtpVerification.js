const User = require("../models/user");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

exports.sendOtp = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "email address not found." });

        const otp = crypto.randomInt(100000, 999999).toString();

        user.Otp = otp;
        user.OtpExpiry = Date.now() + 3600000;
        await user.save();

        const transporter = nodemailer.createTransport({
            service: "gmail", 
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER, 
            to: email, 
            subject: "Your OTP Code from ledger web application testing.",
            text: `Your OTP code is: ${otp}`,
        };

        await transporter.sendMail(mailOptions);
        res.json({message: "OTP has been sent to your email."});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error from OtpVerification.js"});
    }
}

exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await User.findOne({ email: email, Otp: otp, OtpExpiry: {$gt: Date.now()}});
        if(!user) return res.status(400).json({message: "Invalid OTP code. Please try again."}); 

        user.Otp = undefined;
        user.OtpExpiry = undefined;
        await user.save();
        res.json({message: "OTP verification successful."});
    }catch(err) {
        console.log(err);
        res.status(500).json({message: "Server error from OtpVerification.js"});
    }
}
    