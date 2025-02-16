const User = require("../models/user");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

exports.forgot_password = async (req, res) => {
    const { email } = req.body;
    try {
       
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "email address not found." });

        const resetToken = crypto.randomBytes(32).toString("hex");
        User.resetToken = resetToken;
        User.resetTokenExpiry = Date.now() + 3600000;
        await user.save();


        const transporter = nodemailer.createTransport({

            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS 
            }
        });

        const resetURL = `http://localhost:3000/reset-password/${resetToken}`;
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Password Reset Request",
            html: `<p>Click <a href="${resetURL}">here</a> to reset your password.</p>`
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: "Password reset mail has send to your registered mail." });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error from authController.js - reset_password controller." });
    }
}