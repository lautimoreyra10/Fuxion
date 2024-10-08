const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB with Mongoose');        
    } catch (err) {
        console.error("MongoDB connection error: ", err);
        process.exit(1);        
    }
};

module.exports = connectDB;