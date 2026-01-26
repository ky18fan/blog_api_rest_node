const mongoose = require("mongoose");

const connection = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/my_blog");
        // Available parameters if connection fails or 
        // useNewUrlParser : true
        // useUnifiedTopology : true
        // useCreateIndex : true
        console.log("Connected to database my_blog.");
    } catch (error) {
        console.log(error);
        throw new Error("Couldn't connect to database.");
    }
}

module.exports = { connection };