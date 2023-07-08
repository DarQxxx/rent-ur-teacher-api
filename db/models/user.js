const mongoose = require("mongoose");

const user = new mongoose.Schema({
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true
        },
        password: {
            type:String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    }, { collection: "users"}
)
module.exports = mongoose.model("User", user)
