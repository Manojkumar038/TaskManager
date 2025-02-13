const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.reset_password = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const user = User.findOne({resetToken: token, resetTokenExpiry: {$gt: Date.now()}});
        
        if(!user) return res.status(400).json({message: "Token had expired!!"});

        const hashedPassword = bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined; 

        await user.save();
        res.json({message: "Password reset successful...Please login"});

    }catch(err) {
        console.log(err);
        res.status(500).json({message: "Server error from resetPasswordController.js"});
    }
}