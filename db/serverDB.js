const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (err) {
        console.log("Nie połączono z bazą danych")
        console.log(err)
    }
}

module.exports = connectDB
