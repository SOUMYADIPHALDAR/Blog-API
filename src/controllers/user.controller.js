require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

const register = async(req, res) => {
    try {
        const {firstName, lastName, email, password, role} = req.body;
        if(!firstName || !lastName || !email || !password) {
            return res.status(400).json({message: "All fields are required.."});
        }
        const existingUser = await User.findOne({email: req.body.email});
        if(existingUser){
            return res.status(409).json({message: "User already registered.."});
        }
        const encryptPass = await bcrypt.hash(password, 10);
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: encryptPass,
            role
        });
        const token = jwt.sign(
            {id: user._id},
            process.env.SECRET,
            {expiresIn: "1h"}
        );
        user.token = token;
        user.password = undefined;
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: "Email and Password are needed.."});
        }
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(404).json({message: "User not found.."});
        }
        if(!await bcrypt.compare(password, user.password)) {
            return res.status(405).json({message: "Wrong password.."});
        }
        const token = jwt.sign(
            {id: user._id},
            process.env.SECRET,
            {expiresIn: "1h"}
        );
        const option = {
            expires: new Date(Date.now() + 3*24*60*60*1000),
            httpOnly: true
        };
        user.token = token;
        user.password = undefined;
        res.status(201).cookie("token", token, option).json({
            success: true,
            token,
            user
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("token", {httpOnly: true, secure: true, samesite: "strict"});
        res.status(201).json({
            success: true,
            message: "Logout succfully.."
        });
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    register,
    login,
    logout
}