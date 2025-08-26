const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Mongodb connected successfully..${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Mongodb connection failed..", error);
        process.exit(1);
    }
}

module.exports = connectDB;