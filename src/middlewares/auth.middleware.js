const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

const auth = async (req, res, next) => {
    try {
        let token = req.header("Authorization");
        if (token && token.startsWith("Bearer ")) {
            token = token.split(" ")[1]; // ✅ properly extract
        } else if (req.cookies?.token) {
            token = req.cookies.token;
        } else if (req.body?.token) {
            token = req.body.token;
        }
        if(!token){
            return res.status(401).json({message: "Token not provided.."});
        }
        
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.SECRET);
            console.log(decoded);
        } catch (error) {
            return res.status(401).json({message: "Invalid token.."});
        }
        const user = await User.findById(decoded.id);
        if(!user){
            return res.status(404).json({message: "User not found.."});
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = auth;