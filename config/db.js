const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("MongoDB Connected!");
    } catch(err){
        console.error(err.message);
        //Exit process with failure
        process.exit(1);
    }
};

const closeDB = async () => {
    try {
        await mongoose.disconnect();
        console.log("MongoDB Disconnected!");
    } catch (err) {
        console.error("Error disconnecting MongoDB:", err.message);
    }
};

module.exports = { connectDB, closeDB };