const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 

exports.register = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const user = await User.findOne({email});
        if(user) {
            return res.status(200).json({message: "User already exists.!"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({name, email, password: hashedPassword});
        await newUser.save();

        res.status(200).json({message: "User registered successfully."});

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error});
    }
};


exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: "Invalid credentials.!"});
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: "Invalid password..!"});

        const token = jwt.sign({userId: user._id}, process.env.SECRET_KEY, {expiresIn: "1h"});

        res.json({token, message: "Login Successful"});
    } catch (error) {
        res.status(400
            
        ).json({message:"Server error.!"});
    }
};

